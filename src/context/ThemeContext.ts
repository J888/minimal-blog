import { createContext } from "react";

interface AppTheme {
  backgroundPrimary: string;
  backgroundSecondary: string;
  backgroundTertiary: string;
  navBackground: string;
  textBody: string;
  textPrimary: string;
  textSecondary: string;
  textHeadingPrimary: string;
  textHeadingSecondary: string;
  textSecondarySubtitle: string;
  textLink: string;
};

/**
 * Only used when there is not a provider wrapping
 */
const defaultTheme = {
  backgroundPrimary: 'black',
  backgroundSecondary: 'yellow',
  backgroundTertiary: 'black',
  navBackground: '',
  textBody: 'black',
  textPrimary: 'black',
  textSecondary: 'blue',
  textHeadingPrimary: 'black',
  textHeadingSecondary: 'orange',
  textSecondarySubtitle: 'red',
  textLink: 'orange'
};

export const ThemeContext = createContext<AppTheme>(defaultTheme);
