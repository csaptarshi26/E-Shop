export const printAddress = ({ name, locality, address, city, state, landmark, postalCode, country }) => {
  return `${address} , ${landmark} , ${locality} , ${city} , ${state} - ${postalCode}`
}