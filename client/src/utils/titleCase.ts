export default function titleCase(str: string) {
    let title = str.toLowerCase().split(' ');
    title = title.map((word)=>word.charAt(0).toLocaleUpperCase() + word.slice(1))
    return title.join(' ');
  }