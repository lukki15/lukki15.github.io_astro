import { LitElement, html, css } from 'lit';
import { customElement } from 'lit/decorators.js';
import { logoLK } from './icons';

@customElement('theme-logo')
export class ThemeLogo extends LitElement {
	static styles = [
		css`
            .logo-image{
                color: var(--theme-primary);
            }
		`,
	];

	render() {
		return html`
			<div class="logo-image">
				${logoLK}
			</div>
		`;
	}
}
