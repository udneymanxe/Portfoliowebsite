import Dexie, { type Table } from "dexie";

/** Local SRS card — images stored as Blobs in IndexedDB */
export interface FlipkarteCard {
  id?: number;
  level: string;
  german_text: string;
  english_text: string;
  imageBlob?: Blob | null;
  reps?: number;
  interval?: number;
  efactor?: number;
  next_review: number;
}

class FlipkarteDexie extends Dexie {
  flashcards!: Table<FlipkarteCard, number>;

  constructor() {
    super("FlipcardGermanDB_v2");
    this.version(1).stores({
      flashcards: "++id, level, next_review",
    });
  }
}

export const flipkarteDb = new FlipkarteDexie();
