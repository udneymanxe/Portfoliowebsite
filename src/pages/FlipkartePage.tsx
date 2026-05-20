import React, {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import Navbar from "@/components/Navbar";
import { flipkarteDb, type FlipkarteCard } from "@/lib/flipkarteDb";
import "@/styles/flipkarte.css";

const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"] as const;
const ADMIN_PIN = "98633";
const RECOMMENDED_IMAGE_KB = 300;
const MAX_IMAGE_KB = 800;

type BackupCard = Omit<FlipkarteCard, "imageBlob"> & {
  imageDataUrl?: string | null;
};

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

let germanVoice: SpeechSynthesisVoice | null = null;

function pickGermanVoice() {
  const voices = window.speechSynthesis.getVoices();
  germanVoice =
    voices.find(
      (v) =>
        v.lang.startsWith("de") &&
        (v.name.includes("Google") ||
          v.name.includes("Premium") ||
          v.name.includes("Enhanced")),
    ) ??
    voices.find((v) => v.lang === "de-DE") ??
    voices.find((v) => v.lang.startsWith("de")) ??
    null;
}

const FlipkartePage: React.FC = () => {
  const [level, setLevel] = useState<string>("A1");
  const [deck, setDeck] = useState<FlipkarteCard[]>([]);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [pinInput, setPinInput] = useState("");
  const [showSavedCards, setShowSavedCards] = useState(false);
  const [savedCards, setSavedCards] = useState<FlipkarteCard[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const [dueCount, setDueCount] = useState(0);
  const [nextReviewText, setNextReviewText] = useState("");
  const [cardEnter, setCardEnter] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [germanInput, setGermanInput] = useState("");
  const [englishInput, setEnglishInput] = useState("");
  const [saving, setSaving] = useState(false);
  const [speaking, setSpeaking] = useState(false);
  const [audioHint, setAudioHint] = useState("Pronouncing…");
  const [glowStyle, setGlowStyle] = useState(
    "radial-gradient(circle, rgba(201,242,65,0.07) 0%, transparent 70%)",
  );

  const imageFileRef = useRef<HTMLInputElement>(null);
  const importFileRef = useRef<HTMLInputElement>(null);
  const backupImportFileRef = useRef<HTMLInputElement>(null);
  const cardImageRef = useRef<HTMLImageElement>(null);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const selectedImageFile = useRef<File | null>(null);

  const card = deck[index];

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const loadDeck = useCallback(async (lvl: string) => {
    const now = Date.now();
    const rows = await flipkarteDb.flashcards
      .where("level")
      .equals(lvl)
      .filter((c) => (c.next_review ?? 0) <= now)
      .toArray();
    const shuffled = shuffleArray(rows);
    setDeck(shuffled);
    setIndex(0);
    setFlipped(false);
    setCardEnter(true);
    const due = await flipkarteDb.flashcards
      .where("level")
      .equals(lvl)
      .filter((c) => (c.next_review ?? 0) <= now)
      .count();
    setDueCount(due);

    const allLevel = await flipkarteDb.flashcards.where("level").equals(lvl).toArray();
    if (allLevel.length === 0) {
      setNextReviewText("No cards in this level yet.");
    } else {
      const upcoming = allLevel
        .filter((c) => (c.next_review ?? 0) > Date.now())
        .sort((a, b) => a.next_review - b.next_review);
      if (upcoming.length > 0) {
        const mins = Math.round((upcoming[0].next_review - Date.now()) / 60000);
        if (mins < 60) {
          setNextReviewText(
            `Next card due in ~${mins} minute${mins !== 1 ? "s" : ""}`,
          );
        } else {
          const h = Math.round(mins / 60);
          setNextReviewText(`Next card due in ~${h} hour${h !== 1 ? "s" : ""}`);
        }
      } else {
        setNextReviewText("");
      }
    }
  }, []);

  useEffect(() => {
    pickGermanVoice();
    const onVoices = () => pickGermanVoice();
    window.speechSynthesis.addEventListener("voiceschanged", onVoices);
    void loadDeck(level);
    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", onVoices);
    };
  }, [loadDeck, level]);

  useEffect(() => {
    if (!cardEnter) return;
    const t = setTimeout(() => setCardEnter(false), 400);
    return () => clearTimeout(t);
  }, [cardEnter, index, deck.length]);

  const revokeCardImage = useCallback(() => {
    const el = cardImageRef.current;
    if (el?.src.startsWith("blob:")) URL.revokeObjectURL(el.src);
  }, []);

  useEffect(() => {
    const el = cardImageRef.current;
    if (!el || !card) return;
    revokeCardImage();
    if (card.imageBlob) {
      el.src = URL.createObjectURL(card.imageBlob);
    } else {
      el.src = "";
    }
    return () => {
      if (el.src.startsWith("blob:")) URL.revokeObjectURL(el.src);
    };
  }, [card, revokeCardImage]);

  const progressPct =
    deck.length > 0 ? (index / deck.length) * 100 : 0;

  const speakGerman = useCallback(
    (text: string) => {
      if (!text || text === "—") return;
      if (!("speechSynthesis" in window)) return;
      window.speechSynthesis.cancel();
      const utt = new SpeechSynthesisUtterance(text);
      utt.lang = "de-DE";
      utt.rate = 0.92;
      utt.pitch = 1;
      if (germanVoice) utt.voice = germanVoice;
      utt.onstart = () => {
        setSpeaking(true);
        setAudioHint("Playing…");
      };
      utt.onend = utt.onerror = () => {
        setSpeaking(false);
        setAudioHint("Tap 🔊 to replay");
      };
      window.speechSynthesis.speak(utt);
    },
    [],
  );

  const handleFlip = useCallback(() => {
    if (flipped) return;
    const c = deck[index];
    if (!c) return;
    setFlipped(true);
    speakGerman(c.german_text || "—");
    setAudioHint("Pronouncing…");
    setTimeout(() => setAudioHint("Tap 🔊 to replay"), 1800);
    setGlowStyle(
      "radial-gradient(circle, rgba(61,139,255,0.09) 0%, transparent 70%)",
    );
  }, [deck, index, flipped, speakGerman]);

  const resetVisual = useCallback(() => {
    setFlipped(false);
    setAudioHint("Pronouncing…");
    setGlowStyle(
      "radial-gradient(circle, rgba(201,242,65,0.07) 0%, transparent 70%)",
    );
    window.speechSynthesis.cancel();
    setSpeaking(false);
  }, []);

  const gradeCard = useCallback(
    async (quality: number) => {
      const c = deck[index];
      if (!c?.id) return;
      let reps = c.reps ?? 0;
      let interval = c.interval ?? 1;
      let efactor = c.efactor ?? 2.5;

      if (quality >= 3) {
        if (reps === 0) interval = 1;
        else if (reps === 1) interval = 6;
        else interval = Math.round(interval * efactor);
        reps++;
      } else {
        reps = 0;
        interval = 1;
      }

      efactor =
        efactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02));
      if (efactor < 1.3) efactor = 1.3;

      const nextReview = Date.now() + interval * 24 * 60 * 60 * 1000;
      await flipkarteDb.flashcards.update(c.id, {
        reps,
        interval,
        efactor,
        next_review: nextReview,
      });

      const labels: Record<number, string> = {
        1: "📌 See you soon",
        3: "📅 Scheduled +1 day",
        4: `📅 See you in ${interval} day${interval > 1 ? "s" : ""}`,
        5: `🚀 Boosted! ${interval} days`,
      };
      showToast(labels[quality] || "✓ Saved");

      setIndex((i) => i + 1);
      resetVisual();
      const due = await flipkarteDb.flashcards
        .where("level")
        .equals(level)
        .filter((row) => (row.next_review ?? 0) <= Date.now())
        .count();
      setDueCount(due);

      setTimeout(() => setCardEnter(true), 280);
    },
    [deck, index, level, resetVisual, showToast],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (adminOpen) return;
      if (e.key === " " || e.key === "f") {
        if (!flipped && deck[index]) {
          e.preventDefault();
          handleFlip();
        }
      }
      if (e.key === "1" && flipped) void gradeCard(1);
      if (e.key === "2" && flipped) void gradeCard(3);
      if (e.key === "3" && flipped) void gradeCard(4);
      if (e.key === "4" && flipped) void gradeCard(5);
      if (e.key === "r" && deck[index])
        speakGerman(deck[index].german_text);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [adminOpen, flipped, deck, index, handleFlip, gradeCard, speakGerman]);

  const openAdmin = () => setAdminOpen(true);
  const closeAdmin = () => {
    setAdminOpen(false);
    setAdminUnlocked(false);
    setPinInput("");
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return null;
    });
    setGermanInput("");
    setEnglishInput("");
    selectedImageFile.current = null;
    if (imageFileRef.current) imageFileRef.current.value = "";
  };

  const loadSavedCards = useCallback(async () => {
    const rows = await flipkarteDb.flashcards.orderBy("id").reverse().toArray();
    setSavedCards(rows);
  }, []);

  const onImagePick = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.size > MAX_IMAGE_KB * 1024) {
      selectedImageFile.current = null;
      if (imageFileRef.current) imageFileRef.current.value = "";
      showToast(`❌ Max image size is ${MAX_IMAGE_KB}KB`);
      return;
    }
    selectedImageFile.current = file ?? null;
    setPreviewUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev);
      return file ? URL.createObjectURL(file) : null;
    });
  };

  const unlockAdmin = () => {
    if (pinInput === ADMIN_PIN) {
      setAdminUnlocked(true);
      setPinInput("");
      showToast("🔓 Upload unlocked");
    } else {
      showToast("❌ Wrong PIN");
    }
  };

  const saveCard = async () => {
    const german = germanInput.trim();
    const english = englishInput.trim();
    if (!german || !english) {
      showToast("⚠ Enter both words");
      return;
    }
    setSaving(true);
    const file = selectedImageFile.current;
    let imageBlob: Blob | null = null;
    if (file) {
      try {
        imageBlob = await new Promise<Blob>((res, rej) => {
          const reader = new FileReader();
          reader.onload = () =>
            res(new Blob([reader.result as ArrayBuffer], { type: file.type }));
          reader.onerror = rej;
          reader.readAsArrayBuffer(file);
        });
      } catch {
        showToast("❌ Image read failed");
        setSaving(false);
        return;
      }
    }
    try {
      await flipkarteDb.flashcards.add({
        level,
        german_text: german,
        english_text: english,
        imageBlob,
        reps: 0,
        interval: 1,
        efactor: 2.5,
        next_review: Date.now(),
      });
      showToast("🎉 Card saved!");
      closeAdmin();
      void loadDeck(level);
      void loadSavedCards();
    } catch (err) {
      console.error(err);
      showToast("❌ Error saving card");
    } finally {
      setSaving(false);
    }
  };

  const exportJson = async () => {
    const all = await flipkarteDb.flashcards.toArray();
    const data = all.map(({ imageBlob: _b, ...rest }) => rest);
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `flipkarte_export_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(`⬆ Exported ${data.length} cards`);
  };

  const blobToDataUrl = (blob: Blob) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(String(reader.result));
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const dataUrlToBlob = async (dataUrl: string): Promise<Blob> => {
    const res = await fetch(dataUrl);
    return await res.blob();
  };

  const exportBackupWithPhotos = async () => {
    const all = await flipkarteDb.flashcards.toArray();
    const payload: BackupCard[] = await Promise.all(
      all.map(async ({ imageBlob, ...rest }) => ({
        ...rest,
        imageDataUrl: imageBlob ? await blobToDataUrl(imageBlob) : null,
      })),
    );
    const blob = new Blob([JSON.stringify(payload)], {
      type: "application/json",
    });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `flipkarte_backup_with_photos_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
    showToast(`📦 Backup exported (${payload.length} cards + photos)`);
  };

  const importJson = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const cards = JSON.parse(text) as FlipkarteCard[];
      let count = 0;
      for (const c of cards) {
        const exists = await flipkarteDb.flashcards
          .where("level")
          .equals(c.level)
          .filter((x) => x.german_text === c.german_text)
          .first();
        if (!exists) {
          await flipkarteDb.flashcards.add({
            ...c,
            imageBlob: null,
            next_review: c.next_review || Date.now(),
          });
          count++;
        }
      }
      showToast(`⬇ Imported ${count} cards`);
      void loadDeck(level);
    } catch {
      showToast("❌ Import failed");
    }
    e.target.value = "";
  };

  const importBackupWithPhotos = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const cards = JSON.parse(text) as BackupCard[];
      let count = 0;
      for (const c of cards) {
        const exists = await flipkarteDb.flashcards
          .where("level")
          .equals(c.level)
          .filter((x) => x.german_text === c.german_text)
          .first();
        if (!exists) {
          const imageBlob = c.imageDataUrl
            ? await dataUrlToBlob(c.imageDataUrl)
            : null;
          await flipkarteDb.flashcards.add({
            level: c.level,
            german_text: c.german_text,
            english_text: c.english_text,
            imageBlob,
            reps: c.reps ?? 0,
            interval: c.interval ?? 1,
            efactor: c.efactor ?? 2.5,
            next_review: c.next_review || Date.now(),
          });
          count++;
        }
      }
      showToast(`📥 Backup imported (${count} cards with photos)`);
      void loadDeck(level);
      void loadSavedCards();
    } catch {
      showToast("❌ Backup import failed");
    }
    e.target.value = "";
  };

  const deleteCurrentCard = async () => {
    const c = deck[index];
    if (!c?.id) return;
    const ok = window.confirm(
      `Delete card "${c.german_text}" (${c.english_text})? This cannot be undone.`,
    );
    if (!ok) return;

    await flipkarteDb.flashcards.delete(c.id);
    showToast("🗑️ Card deleted");
    resetVisual();
    void loadDeck(level);
    void loadSavedCards();
  };

  const deleteSavedCard = async (cardId?: number, germanWord?: string) => {
    if (!cardId) return;
    const ok = window.confirm(
      `Delete "${germanWord ?? "this card"}"? This cannot be undone.`,
    );
    if (!ok) return;
    await flipkarteDb.flashcards.delete(cardId);
    setSavedCards((prev) => prev.filter((c) => c.id !== cardId));
    showToast("🗑️ Card deleted");
    void loadDeck(level);
  };

  useEffect(() => {
    if (adminOpen && showSavedCards) {
      void loadSavedCards();
    }
  }, [adminOpen, showSavedCards, loadSavedCards]);

  const empty = !card;
  const maxDots = Math.min(deck.length, 7);
  const dotActive = Math.min(index, Math.max(0, maxDots - 1));

  return (
    <div className="flipkarte-page fk-grain min-h-screen bg-black text-foreground overflow-x-hidden">
      <Navbar />
      <div className="mx-auto flex max-w-[480px] flex-col h-[calc(100dvh-4.5rem)] sm:h-[calc(100dvh-5rem)] pt-[4.5rem] sm:pt-20 relative z-10 overflow-hidden">
        {/* Header */}
        <header className="flex shrink-0 items-center justify-between border-b border-primary/20 bg-black/80 px-5 py-3.5">
          <div className="flipkarte-font-display text-[28px] leading-none tracking-[0.06em] text-primary">
            FLIP<span className="text-foreground/45">KARTE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flipkarte-font-display rounded-xl border-[1.5px] border-primary/20 bg-card px-3 py-1.5 text-[15px] tracking-[0.04em] text-muted-foreground">
              <span className="text-primary">{dueCount}</span> due
            </div>
            <select
              value={level}
              onChange={(e) => {
                setLevel(e.target.value);
                resetVisual();
                void loadDeck(e.target.value);
              }}
              className="flipkarte-font-display cursor-pointer appearance-none rounded-xl border-[1.5px] border-primary/20 bg-card py-1.5 pl-3.5 pr-3 text-[17px] tracking-[0.05em] text-foreground outline-none transition-colors focus:border-primary"
            >
              {LEVELS.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
            <button
              type="button"
              onClick={openAdmin}
              className="flipkarte-font-display shrink-0 cursor-pointer rounded-xl border-none bg-primary px-4 py-1.5 text-[18px] tracking-[0.05em] text-primary-foreground transition-transform active:scale-95"
            >
              + ADD
            </button>
          </div>
        </header>

        <div className="h-[3px] shrink-0 overflow-hidden bg-primary/20">
          <div
            className="h-full bg-gradient-to-r from-primary/70 to-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progressPct}%` }}
          />
        </div>

        <main className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 pb-2 pt-5">
          <div
            className="pointer-events-none absolute h-80 w-80 rounded-full transition-[background] duration-500"
            style={{ background: glowStyle }}
          />

          {empty ? (
            <div className="fk-animate-fadeUp flex max-w-[320px] flex-col items-center gap-3 rounded-3xl border-[1.5px] border-primary/20 bg-card px-7 py-9 text-center">
              <div className="text-5xl">🎉</div>
              <h2 className="flipkarte-font-display text-[28px] tracking-[0.05em] text-primary">
                ALLES SUPER
              </h2>
              <p className="text-sm leading-relaxed text-muted-foreground">
                No cards are due for review right now in this level.
              </p>
              <p className="text-xs font-semibold text-primary/80">
                {nextReviewText}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Add more cards or choose another level.
              </p>
            </div>
          ) : (
            <>
              <div
                className={`fk-perspective w-full max-w-[380px] aspect-[3/4] max-h-[460px] min-h-0 ${cardEnter ? "fk-animate-cardEnter" : ""}`}
              >
                <button
                  type="button"
                  className={`fk-flip-inner relative h-full w-full cursor-pointer rounded-3xl border-none bg-transparent p-0 text-left ${flipped ? "is-flipped" : ""}`}
                  onClick={handleFlip}
                  aria-label={flipped ? "Answer side" : "Tap to reveal answer"}
                >
                  <div className="fk-face absolute inset-0 flex flex-col overflow-hidden rounded-3xl border-[1.5px] border-primary/20 bg-card">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <span className="flipkarte-font-display text-[13px] tracking-[0.12em] text-muted-foreground">
                        VISUAL PROMPT
                      </span>
                      <span className="flipkarte-font-display rounded-md bg-primary px-2 py-0.5 text-[13px] tracking-[0.08em] text-primary-foreground">
                        {level}
                      </span>
                    </div>
                    <div className="flex flex-1 items-center justify-center overflow-hidden px-5 py-3">
                      <img
                        ref={cardImageRef}
                        alt=""
                        className="h-full w-full max-h-full rounded-xl bg-black object-cover"
                      />
                    </div>
                    <div className="flex items-center justify-center gap-2 py-3.5">
                      <span className="fk-tap-dot h-1.5 w-1.5 rounded-full bg-primary" />
                      <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        Tap to reveal
                      </span>
                      <span
                        className="fk-tap-dot h-1.5 w-1.5 rounded-full bg-primary"
                        style={{ animationDelay: "0.3s" }}
                      />
                    </div>
                  </div>

                  <div className="fk-face fk-face-back absolute inset-0 flex flex-col overflow-hidden rounded-3xl border-2 border-primary bg-card">
                    <div className="flex items-center justify-between px-5 pt-4">
                      <span className="flipkarte-font-display text-[13px] tracking-[0.12em] text-primary">
                        ANTWORT
                      </span>
                      <button
                        type="button"
                        className={`flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-full border-none bg-primary text-primary-foreground transition-transform active:scale-90 ${speaking ? "fk-tts-speaking" : ""}`}
                        title="Replay pronunciation"
                        aria-label="Speak German word"
                        onClick={(e) => {
                          e.stopPropagation();
                          speakGerman(card.german_text);
                        }}
                      >
                        <svg
                          viewBox="0 0 24 24"
                          width={18}
                          height={18}
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2.5}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          aria-hidden
                        >
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                          <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex flex-1 flex-col items-center justify-center gap-2.5 px-6 py-5 text-center">
                      <div className="flipkarte-font-display break-words text-[clamp(32px,9vw,48px)] leading-tight tracking-[0.04em] text-foreground">
                        {card.german_text || "—"}
                      </div>
                      <div className="h-0.5 w-10 rounded-sm bg-primary/20" />
                      <div className="break-words text-[17px] font-semibold text-muted-foreground">
                        {card.english_text || "—"}
                      </div>
                    </div>
                    <div className="flex justify-center py-3.5">
                      <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
                        {audioHint}
                      </span>
                    </div>
                  </div>
                </button>
              </div>

              <div className="mt-3.5 flex justify-center gap-1.5">
                {Array.from({ length: maxDots }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1.5 w-1.5 rounded-full transition-colors ${i === dotActive ? "bg-primary" : "bg-primary/20"}`}
                  />
                ))}
              </div>
            </>
          )}
        </main>

        <footer className="shrink-0 border-t-[1.5px] border-primary/20 bg-black/80 px-4 pb-4 pt-3">
          {flipped && card ? (
            <div>
              <p className="mb-2.5 text-center text-[11px] font-extrabold uppercase tracking-[0.12em] text-muted-foreground">
                How well did you know this?
              </p>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { q: 1, cls: "bg-[#3a1515] text-[#ff4d4d] border-[#5c2020]", em: "😵", t: "FORGOT", s: "Again" },
                    { q: 3, cls: "bg-[#2e2310] text-[#ffb020] border-[#4a3818]", em: "😓", t: "HARD", s: "+1 day" },
                    { q: 4, cls: "bg-primary/15 text-primary border-primary/35", em: "🙂", t: "GOOD", s: "Normal" },
                    { q: 5, cls: "bg-primary/20 text-primary border-primary/45", em: "😎", t: "EASY", s: "Boost" },
                  ] as const
                ).map((b) => (
                  <button
                    key={b.q}
                    type="button"
                    onClick={() => void gradeCard(b.q)}
                    className={`flipkarte-font-display flex cursor-pointer flex-col items-center gap-0.5 rounded-2xl border-[1.5px] px-1 py-3 text-[16px] tracking-[0.06em] transition-transform active:scale-95 ${b.cls}`}
                  >
                    <span className="text-lg">{b.em}</span>
                    <span>{b.t}</span>
                    <span className="font-sans text-[9px] font-bold uppercase tracking-[0.06em] opacity-70">
                      {b.s}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          ) : null}
        </footer>
      </div>

      {/* Admin drawer */}
      <div
        className={`fixed inset-0 z-[100] flex items-end justify-center bg-black/88 backdrop-blur-sm transition-opacity ${adminOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={(e) => e.target === e.currentTarget && closeAdmin()}
        role="presentation"
      >
        <div
          className={`w-full max-w-[480px] max-h-[90dvh] overflow-y-auto rounded-t-3xl border-t-[1.5px] border-primary/20 bg-card px-5 pb-6 pt-6 transition-transform duration-300 ease-out ${adminOpen ? "translate-y-0" : "translate-y-full"}`}
          style={{ paddingBottom: "max(1.5rem, env(safe-area-inset-bottom))" }}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mx-auto mb-5 h-1 w-9 rounded-sm bg-primary/20" />
          <div className="flipkarte-font-display mb-4 text-2xl tracking-[0.05em] text-primary">
            NEW CARD
          </div>
          <button
            type="button"
            onClick={() => setShowSavedCards((v) => !v)}
            className="mb-3 w-full cursor-pointer rounded-xl border border-primary/25 bg-black/20 py-2 text-sm font-bold text-primary transition-colors hover:bg-primary/10"
          >
            {showSavedCards ? "Hide saved cards" : "View all saved cards"}
          </button>
          {showSavedCards ? (
            <div className="mb-4 max-h-56 overflow-y-auto rounded-xl border border-primary/20 bg-black/20 p-2">
              {savedCards.length === 0 ? (
                <p className="px-2 py-3 text-sm text-muted-foreground">No cards saved yet.</p>
              ) : (
                savedCards.map((saved) => (
                  <div
                    key={saved.id}
                    className="mb-2 flex items-start justify-between rounded-lg border border-primary/15 bg-card px-3 py-2"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm font-bold text-foreground">
                        {saved.german_text} - {saved.english_text}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {saved.level} | Next:{" "}
                        {new Date(saved.next_review || Date.now()).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => void deleteSavedCard(saved.id, saved.german_text)}
                      className="ml-3 shrink-0 rounded-md border border-[#5c2020] bg-[#3a1515] px-2 py-1 text-xs font-bold text-[#ff4d4d]"
                    >
                      Delete
                    </button>
                  </div>
                ))
              )}
            </div>
          ) : null}
          {!adminUnlocked ? (
            <div className="mb-3 space-y-3">
              <p className="text-sm text-muted-foreground">
                Enter PIN to unlock uploads.
              </p>
              <input
                type="password"
                inputMode="numeric"
                maxLength={5}
                className="w-full rounded-xl border-[1.5px] border-primary/20 bg-black/20 px-3.5 py-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                placeholder="Enter PIN"
                value={pinInput}
                onChange={(e) => setPinInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && unlockAdmin()}
              />
              <div className="flex gap-2.5">
                <button
                  type="button"
                  onClick={unlockAdmin}
                  className="flipkarte-font-display flex-1 cursor-pointer rounded-2xl border-none bg-primary py-3.5 text-[18px] tracking-[0.06em] text-primary-foreground"
                >
                  UNLOCK
                </button>
                <button
                  type="button"
                  onClick={closeAdmin}
                  className="cursor-pointer rounded-2xl border-[1.5px] border-primary/20 bg-black/20 px-5 py-3.5 text-sm font-bold text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="mb-2.5 grid grid-cols-2 gap-2.5">
                <input
                  className="w-full rounded-xl border-[1.5px] border-primary/20 bg-black/20 px-3.5 py-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  placeholder="🇩🇪 German word"
                  value={germanInput}
                  onChange={(e) => setGermanInput(e.target.value)}
                />
                <input
                  className="w-full rounded-xl border-[1.5px] border-primary/20 bg-black/20 px-3.5 py-3 text-sm font-semibold text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary"
                  placeholder="🇬🇧 English"
                  value={englishInput}
                  onChange={(e) => setEnglishInput(e.target.value)}
                />
              </div>
              <p className="mb-2 text-xs text-muted-foreground">
                Recommended: up to {RECOMMENDED_IMAGE_KB}KB. Hard limit: {MAX_IMAGE_KB}KB.
              </p>
              <label
                htmlFor="fk-image-file"
                className="mb-3.5 flex cursor-pointer items-center gap-2.5 rounded-xl border-[1.5px] border-dashed border-primary/25 bg-black/20 px-3.5 py-3 transition-colors hover:border-primary"
              >
                <svg width={20} height={20} fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <circle cx="8.5" cy="8.5" r="1.5" />
                  <polyline points="21 15 16 10 5 21" />
                </svg>
                <span className="text-[13px] font-semibold text-muted-foreground">
                  <strong className="text-primary">Choose image</strong> — JPG, PNG, WEBP
                </span>
              </label>
              <input
                id="fk-image-file"
                ref={imageFileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onImagePick}
              />
              {previewUrl ? (
                <div className="mb-3.5 max-h-[140px] overflow-hidden rounded-xl">
                  <img src={previewUrl} alt="" className="h-[140px] w-full object-cover" />
                </div>
              ) : null}
              <div className="mb-3 flex gap-2.5">
                <button
                  type="button"
                  disabled={saving}
                  onClick={() => void saveCard()}
                  className="flipkarte-font-display flex-1 cursor-pointer rounded-2xl border-none bg-primary py-3.5 text-[18px] tracking-[0.06em] text-primary-foreground transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {saving ? "Saving…" : "SAVE CARD"}
                </button>
                <button
                  type="button"
                  onClick={closeAdmin}
                  className="cursor-pointer rounded-2xl border-[1.5px] border-primary/20 bg-black/20 px-5 py-3.5 text-sm font-bold text-muted-foreground"
                >
                  Cancel
                </button>
              </div>
            </>
          )}
          <div className="mt-2.5 flex gap-2 border-t border-primary/20 pt-3.5">
            <button
              type="button"
              onClick={() => void exportJson()}
              className="flex-1 cursor-pointer rounded-[10px] border-[1.5px] border-primary/20 bg-black/20 py-2.5 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              ⬆ Export JSON
            </button>
            <button
              type="button"
              onClick={() => importFileRef.current?.click()}
              className="flex-1 cursor-pointer rounded-[10px] border-[1.5px] border-primary/20 bg-black/20 py-2.5 text-xs font-bold uppercase tracking-wide text-muted-foreground transition-colors hover:border-primary hover:text-primary"
            >
              ⬇ Import JSON
            </button>
            <input
              ref={importFileRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={(e) => void importJson(e)}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              onClick={() => void exportBackupWithPhotos()}
              className="flex-1 cursor-pointer rounded-[10px] border-[1.5px] border-primary/25 bg-primary/10 py-2.5 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary/20"
            >
              📦 Backup+Photos Export
            </button>
            <button
              type="button"
              onClick={() => backupImportFileRef.current?.click()}
              className="flex-1 cursor-pointer rounded-[10px] border-[1.5px] border-primary/25 bg-primary/10 py-2.5 text-xs font-bold uppercase tracking-wide text-primary transition-colors hover:bg-primary/20"
            >
              📥 Backup+Photos Import
            </button>
            <input
              ref={backupImportFileRef}
              type="file"
              accept=".json,application/json"
              className="hidden"
              onChange={(e) => void importBackupWithPhotos(e)}
            />
          </div>
          <div className="mt-2 flex gap-2">
            <button
              type="button"
              disabled={!card}
              onClick={() => void deleteCurrentCard()}
              className="w-full cursor-pointer rounded-[10px] border-[1.5px] border-[#5c2020] bg-[#3a1515] py-2.5 text-xs font-bold uppercase tracking-wide text-[#ff4d4d] transition-opacity disabled:cursor-not-allowed disabled:opacity-40"
            >
              🗑 Delete Current Card
            </button>
          </div>
        </div>
      </div>

      <div
        className={`flipkarte-font-display fixed left-1/2 top-[4.5rem] z-[200] -translate-x-1/2 rounded-full bg-primary px-5 py-2 text-[16px] tracking-[0.06em] text-primary-foreground transition-all duration-300 pointer-events-none whitespace-nowrap ${toast ? "translate-y-0 opacity-100" : "-translate-y-4 opacity-0"}`}
        role="status"
      >
        {toast}
      </div>

    </div>
  );
};

export default FlipkartePage;
