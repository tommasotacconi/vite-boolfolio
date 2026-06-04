function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

const skills = [
  ['html', , 'html5'],
  ['css', , 'css3'],
  ['js', 'Javascript'],
  ['bootstrap'],
  ['sass'],
  ['vue', 'Vue.js', 'vuejs'],
  ['react', 'React.js'],
  ['node', 'Node.js'],
  ['php'],
  ['laravel'],
  ['sql', , 'database'],
  ['postgresql'],
];

export default Object.fromEntries(skills.map(([key, label = capitalize(key), faIcon = key]) => [key, { label, faIcon }]));
