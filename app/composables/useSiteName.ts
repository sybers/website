export function useSiteName() {
  const siteHost = useRequestURL().host;
  return siteHost;
}
