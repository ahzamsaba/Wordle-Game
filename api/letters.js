export default function handler(req, res) {
  const letters = [
    { key: "a" }, { key: "b" }, { key: "c" }, { key: "d" }, { key: "e" },
    { key: "f" }, { key: "g" }, { key: "h" }, { key: "i" }, { key: "j" },
    { key: "k" }, { key: "l" }, { key: "m" }, { key: "n" }, { key: "o" },
    { key: "p" }, { key: "q" }, { key: "r" }, { key: "s" }, { key: "t" },
    { key: "u" }, { key: "v" }, { key: "w" }, { key: "x" }, { key: "y" }, { key: "z" }
  ];
  res.status(200).json(letters);
}
