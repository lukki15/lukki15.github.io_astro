import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';

import {
	classicThemeIcon,
	darkThemeIcon,
	earthThemeIcon,
	blueThemeIcon,
	orangeThemeIcon,
} from './icons';

const themes = [
	{
		name: 'default',
		icon: classicThemeIcon,
		label: 'Classic',
	},
	{
		name: 'dark',
		icon: darkThemeIcon,
		label: 'Dark',
	},
	{
		name: 'earth',
		icon: earthThemeIcon,
		label: 'Earth',
	},
	{
		name: 'ocean',
		icon: blueThemeIcon,
		label: 'Ocean',
	},
	{
		name: 'sand',
		icon: orangeThemeIcon,
		label: 'Sand',
	}
]

@customElement('theme-switcher')
export class ThemeSwitcher extends LitElement {
	static styles = [
		css`
			:host {
				display: block;
			}
			button {
				display: inline-flex;
				outline: none;
				border: none;
				background-color: transparent;
				border: 2px solid transparent;
				border-radius: 20rem;
				padding: 1px;
				cursor: pointer;
				transition: border var(--theme-transition);
			}
			button[active] {
				border: 2px solid var(--theme-primary);
        box-shadow: 0 0 12px 1px var(--theme-primary);
			}
			button:hover {
				border: 2px solid var(--theme-primary);
			}
			.theme-switcher__container {
				margin: 2rem 0;
				display: grid;
				grid-template-columns: repeat(5, 1fr);
			}
			.theme-select__container {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
			}
			.theme-select__container p {
				font-size: var(--font-size-sm);
			}
		`,
	];

	@property({ type: String })
	theme: string | null = null;

	private _getCurrentTheme() {
		// check for a local storage theme first
		const localStorageTheme = localStorage.getItem('theme');
		if (localStorageTheme !== null) {
			this._setTheme(localStorageTheme);
		} else {
			this._setTheme('default');
		}
	}

	firstUpdated() {
		this._getCurrentTheme();
	}

	private _setTheme(theme) {
		document.firstElementChild.setAttribute('data-theme', theme);

		const _heroImage = document.querySelector('#home-hero-image') as HTMLImageElement;
		if (_heroImage) {
			if (theme === 'default') {
				_heroImage.style.filter = 'invert(0%) sepia(0%) saturate(0%) hue-rotate(148deg) brightness(95%) contrast(103%)';
			}
			if (theme === 'dark') {
				_heroImage.style.filter = 'invert(100%) sepia(0%) saturate(7500%) hue-rotate(356deg) brightness(108%) contrast(104%)';
			}
			if (theme === 'earth') {
				_heroImage.style.filter = 'invert(22%) sepia(14%) saturate(764%) hue-rotate(73deg) brightness(97%) contrast(99%)';
			}
			if (theme === 'ocean') {
				_heroImage.style.filter = 'invert(23%) sepia(28%) saturate(7092%) hue-rotate(207deg) brightness(84%) contrast(84%)';
			}
			if (theme === 'sand') {
				_heroImage.style.filter = 'invert(67%) sepia(65%) saturate(2454%) hue-rotate(348deg) brightness(94%) contrast(89%)';
			}
		}
		localStorage.setItem('theme', theme);
		this.theme = theme;
	}

	render() {
		const themeButtons = html`${themes.map((theme) => {
			return html`
      <div class="theme-select__container">
        <button
          @click=${() => this._setTheme(theme.name)}
          ?active=${this.theme === theme.name}
          title=${`Enable ${theme.label} Theme`}
        >
          ${theme.icon}
        </button>
        <p>${theme.label}</p>
        </div>
      `
		})}`

		return html`
			<p><b>Theme selector:</b></p>
			<div class="theme-switcher__container">
				${themeButtons}
			</div>
		`;
	}
}
