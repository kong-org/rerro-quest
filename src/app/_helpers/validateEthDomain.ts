export default function isValidEthDomain(domain: string) {
  const regex = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.eth$/;

  return regex.test(domain);
}
