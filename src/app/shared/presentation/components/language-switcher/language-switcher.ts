import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MatButtonToggle, MatButtonToggleGroup } from '@angular/material/button-toggle';

/**
 * Presentation component for language selection and switching.
 *
 * @remarks
 * This component provides UI controls for users to switch the application's
 * display language. It integrates with the ngx-translate library to manage
 * translations across the entire application. The component displays a
 * button toggle group with available language options and updates the
 * application's current language when a user makes a selection.
 *
 * Supported languages and translations are defined in the i18n configuration
 * and corresponding translation files.
 *
 * @example
 * ```html
 * <app-language-switcher></app-language-switcher>
 * ```
 */
@Component({
  selector: 'app-language-switcher',
  imports: [MatButtonToggleGroup, MatButtonToggle],
  templateUrl: './language-switcher.html',
  styleUrl: './language-switcher.css',
})
export class LanguageSwitcher {
  /** The currently active language code (e.g., 'en', 'es'). */
  currentLang = 'en';

  /** Array of supported language codes available for user selection. */
  languages = ['en', 'es'];

  /**
   * Constructs the LanguageSwitcher component and initializes the current language.
   *
   * @remarks
   * The constructor retrieves the current language from the TranslateService,
   * ensuring the UI reflects the active language setting when the component
   * is created.
   *
   * @param translate - The ngx-translate TranslateService for managing
   *                    application-wide translations and language switching.
   */
  constructor(private translate: TranslateService) {
    this.currentLang = translate.getCurrentLang();
  }

  /**
   * Switches the application to the specified language.
   *
   * @remarks
   * This method updates the active language in the TranslateService, causing
   * all parts of the application subscribed to the translation service to
   * update their displayed content to the selected language.
   *
   * @param language - The language code to switch to (e.g., 'en', 'es').
   *
   * @example
   * ```typescript
   * this.useLanguage('es'); // Switch to Spanish
   * ```
   */
  useLanguage(language: string): void {
    this.translate.use(language);
  }
}
