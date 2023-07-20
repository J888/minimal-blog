import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { useEffect } from 'react';
import { useRouter } from 'next/dist/client/router';
import { ThemeContext } from '@/context/ThemeContext';

const sandTheme = {
  backgroundPrimary: '#ded9ce',
  backgroundSecondary: '#706255',
  backgroundTertiary: '#474647',
  navBackground: '#917f5a',
  textBody: '#050A30',
  textPrimary: 'black',
  textSecondary: 'white',
  textSecondarySubtitle: '#ded9ce',
  textHeadingPrimary: 'black',
  textHeadingSecondary: '#ab9461',
};

const redWhiteAndBlue = {
  backgroundPrimary: '#0C6291',
  backgroundSecondary: '#FBFEF9',
  backgroundTertiary: '#8693AB',
  navBackground: '#FBFEF9',
  textBody: '#F1F2F6',
  textPrimary: '#C492B1',
  textSecondary: 'black',
  textSecondarySubtitle: '#A63446',
  textHeadingPrimary: '#FBFEF9',
  textHeadingSecondary: '#474E4F',
  textLink: 'yellow'
};

const lightTheme = {
  backgroundPrimary: '#fff',
  backgroundSecondary: '#fafafa',
  backgroundTertiary: '#5a5b66',
  navBackground: '#fff',
  textBody: '#202124',
  textPrimary: '#6d6e70',
  textSecondary: 'black',
  textSecondarySubtitle: '#1f3136',
  textHeadingPrimary: '#000',
  textHeadingSecondary: '#5c5c5c',
  textLink: '#1a0dab'
};

const selectedTheme = lightTheme;

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter()

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      if (!process.env.DEV_MODE && ((typeof (window as any).gtag) === `function`)) {
        (window as any).gtag('config', process.env.GA_MEAS_ID, {
          page_path: url,
        })
      }
    }
    //When the component is mounted, subscribe to router changes
    //and log those page views
    router.events.on('routeChangeComplete', handleRouteChange)

    // If the component is unmounted, unsubscribe
    // from the event with the `off` method
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ThemeContext.Provider value={selectedTheme}>
      <Component {...pageProps} />
    </ThemeContext.Provider>
  );
}
