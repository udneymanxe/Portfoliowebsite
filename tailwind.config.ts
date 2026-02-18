
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
				display: ['Inter', 'system-ui', 'sans-serif'],
				mono: ['monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				medical: {
					gold: '#F5D145',
					darkGold: '#D4A41B',
					light: '#FFF9DB'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'fade-in': {
					'0%': { opacity: '0', transform: 'translateY(10px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-out': {
					'0%': { opacity: '1', transform: 'translateY(0)' },
					'100%': { opacity: '0', transform: 'translateY(10px)' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'scale-in': {
					'0%': { transform: 'scale(0.97)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-slow': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.7' }
				},
				float: {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-10px)' }
				},
				'spin-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'spin-medium': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'spin-fast': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'spin-ultra-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'spin-ultra-fast': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(720deg)' }
				},
				'spin-hyper-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'spin-hyper-fast': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(1080deg)' }
				},
				'spin-mega-slow': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'spin-slow-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'spin-medium-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'spin-fast-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'spin-ultra-slow-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'spin-ultra-fast-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(720deg)' }
				},
				'spin-hyper-slow-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(-360deg)' }
				},
				'spin-hyper-fast-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(1080deg)' }
				},
				'spin-mega-slow-hover': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
			'mandala-wave': {
				'0%': { transform: 'scale(0.85)', opacity: '0.5' },
				'100%': { transform: 'scale(1.8)', opacity: '0' }
			},
			'mandala-breathe': {
				'0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
				'50%': { transform: 'scale(1.12)', opacity: '0.75' }
			},
			'mandala-shimmer': {
				'0%, 100%': { opacity: '0.15', filter: 'brightness(1)' },
				'33%': { opacity: '0.5', filter: 'brightness(1.4)' },
				'66%': { opacity: '0.25', filter: 'brightness(0.9)' }
			},
			'mandala-sparkle': {
				'0%, 100%': { opacity: '0', transform: 'scale(0) rotate(0deg)' },
				'50%': { opacity: '1', transform: 'scale(1) rotate(180deg)' }
			},
			'energy-pulse': {
				'0%, 100%': { boxShadow: '0 0 20px rgba(245, 209, 69, 0.2), 0 0 40px rgba(245, 209, 69, 0.1)', opacity: '0.6' },
				'50%': { boxShadow: '0 0 40px rgba(245, 209, 69, 0.4), 0 0 80px rgba(245, 209, 69, 0.2), 0 0 120px rgba(245, 209, 69, 0.1)', opacity: '1' }
			},
			'text-reveal': {
				'0%': { transform: 'translateY(100%)', opacity: '0' },
				'100%': { transform: 'translateY(0)', opacity: '1' }
			},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-left': {
					'0%': { transform: 'translateX(20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-right': {
					'0%': { transform: 'translateX(-20px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.6s ease-out',
				'fade-out': 'fade-out 0.6s ease-out',
				'slide-in': 'slide-in 0.6s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
				'float': 'float 6s ease-in-out infinite',
				'spin-slow': 'spin-slow 120s linear infinite',
				'spin-medium': 'spin-medium 100s linear infinite',
				'spin-fast': 'spin-fast 80s linear infinite',
				'spin-ultra-slow': 'spin-ultra-slow 200s linear infinite',
				'spin-ultra-fast': 'spin-ultra-fast 60s linear infinite',
				'spin-hyper-slow': 'spin-hyper-slow 300s linear infinite',
				'spin-hyper-fast': 'spin-hyper-fast 40s linear infinite',
				'spin-mega-slow': 'spin-mega-slow 60000s linear infinite',
				'spin-slow-hover': 'spin-slow-hover 15s linear infinite',
				'spin-medium-hover': 'spin-medium-hover 8s linear infinite',
				'spin-fast-hover': 'spin-fast-hover 5s linear infinite',
				'spin-ultra-slow-hover': 'spin-ultra-slow-hover 25s linear infinite',
				'spin-ultra-fast-hover': 'spin-ultra-fast-hover 3s linear infinite',
				'spin-hyper-slow-hover': 'spin-hyper-slow-hover 40s linear infinite',
				'spin-hyper-fast-hover': 'spin-hyper-fast-hover 1.5s linear infinite',
			'spin-mega-slow-hover': 'spin-mega-slow-hover 10000s linear infinite',
			'mandala-wave': 'mandala-wave 6s ease-out infinite',
			'mandala-breathe': 'mandala-breathe 8s ease-in-out infinite',
			'mandala-shimmer': 'mandala-shimmer 5s ease-in-out infinite',
			'mandala-sparkle': 'mandala-sparkle 3s ease-in-out infinite',
			'energy-pulse': 'energy-pulse 4s ease-in-out infinite',
			'text-reveal': 'text-reveal 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
				'slide-up': 'slide-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-down': 'slide-down 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-left': 'slide-left 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
				'slide-right': 'slide-right 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
