
export const gaEvent = (eventName: string, params: any) => {
  if ((window as any).gtag) {
    (window as any).gtag(`event`, eventName, params);
  }
}
