const debug = document.getElementById('debug');
const dtf = new Intl.DateTimeFormat(undefined, {
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
});

export function log(...messages) {
  const [main, ...sub] = messages;

  debug.insertAdjacentHTML(
    'beforeend',
    `<li>${dtf.format(new Date())} ${main}${
      sub.length == 0 ? '' : `<ul>${sub.map(msg => `<li>${msg}</li>`)}</ul>`
    }</li>`,
  );
}
