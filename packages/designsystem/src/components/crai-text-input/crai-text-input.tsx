import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';
import { GlassFilter } from '../../lib/glass-filter';

@Component({
  tag: 'crai-text-input',
  styleUrl: 'crai-text-input.css',
  shadow: true,
})
export class CraiTextInput {
  @Prop() variant: 'primary' | 'glass' | 'transparent' | 'outlined' = 'primary';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() placeholder: string = '';
  @Prop({ mutable: true, reflect: true }) value: string = '';
  @Prop({ reflect: true }) required: boolean = false;
  @Prop() autoFocus: boolean = false;
  @Prop() autoComplete: string = 'off';
  @Prop() autoCorrect: 'on' | 'off' = 'on';
  @Prop() autoCapitalize: 'off' | 'on' | 'sentences' | 'words' | 'characters' = 'off';
  @Prop() readonly: boolean = false;
  @Prop() label: string | undefined = undefined;
  @Prop({ reflect: true, attribute: 'help-text' }) helpText: string | undefined = undefined;

  @Event({ eventName: 'craiTextChange', bubbles: true }) craiChange: EventEmitter<Event>;

  /**
   * Handle change events from the input element.
   *
   * Emits the `craiChange` event with the original event and updates the component's
   * internal `value` property using the event target's value (the target is expected
   * to be an HTMLInputElement).
   *
   * Notes:
   * - Side effects: emits an event and mutates `this.value`.
   * - The method assumes `e.target` is an HTMLInputElement; if it's not, the result is undefined.
   *
   * @param e - The change event from the input element.
   * @private
   * @returns void
   */
  private _onChange(e: Event) {
    this.craiChange.emit(e);
    this.value = (e.target as HTMLInputElement).value;
  }
  render() {
    return (
      <Host>
        {this.label && <label htmlFor={'input'}>{this.label}</label>}
        <span>
          <input
            type="text"
            placeholder={this.placeholder}
            disabled={this.disabled}
            required={this.required}
            autoFocus={this.autoFocus}
            autoComplete={this.autoComplete}
            autoCorrect={this.autoCorrect}
            autoCapitalize={this.autoCapitalize}
            onInput={event => this._onChange(event)}
            value={this.value}
            id={'input'}
            readOnly={this.readonly}
          />
        </span>
        {this.helpText && <small>{this.helpText}</small>}
        {this.variant === 'glass' && <GlassFilter />}
      </Host>
    );
  }
}
