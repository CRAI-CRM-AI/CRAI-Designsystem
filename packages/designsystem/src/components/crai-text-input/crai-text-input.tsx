import { Component, Event, EventEmitter, Host, Prop, h } from '@stencil/core';

@Component({
  tag: 'crai-text-input',
  styleUrl: 'crai-text-input.css',
  shadow: true,
})
export class CraiTextInput {
  @Prop() variant: 'primary' | 'glass' | 'transparent' = 'primary';
  @Prop({ reflect: true }) disabled: boolean = false;
  @Prop() placeholder: string = '';
  @Prop({ mutable: true, reflect: true }) value: string = '';
  @Prop({ reflect: true }) required: boolean = false;
  @Prop() autoFocus: boolean = false;
  @Prop() autoComplete: string = 'off';
  @Prop() autoCorrect: 'on' | 'off' = 'on';
  @Prop() autoCapitalize: 'off' | 'on' | 'sentences' | 'words' | 'characters' = 'off';

  @Event({ eventName: 'craiTextChange', bubbles: true }) craiChange: EventEmitter<Event>;

  private _onChange(e: Event) {
    this.craiChange.emit(e);
    this.value = (e.target as HTMLInputElement).value;
  }
  render() {
    return (
      <Host>
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
        />
      </Host>
    );
  }
}
