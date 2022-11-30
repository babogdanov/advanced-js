const fs = require("fs")

// 1. read from sample.txt
// 2. filter with regexes from bad_words
// 3. write to cleaned.txt

fs.readFile("./sample.txt", { encoding: "utf-8" }, (err, data) => {
  const dataAsArr = data.toString().split("\r\n")

  console.log(dataAsArr)
  fs.readFile("./bad_word_regexes.txt", { encoding: "utf-8" }, (err, data) => {
    const regexes = data
      .toString()
      .split("\r\n")
      .map((line) => new RegExp(line))

    const filtered = dataAsArr.map((line) => {
      const words = line.split(" ")
      let filteredWords = []
      words.forEach((word) =>
        filteredWords.push(
          regexes.some((regex) => regex.test(word))
            ? "*".repeat(word.length)
            : word
        )
      )

      return filteredWords.join(" ")
    })
    console.log(filtered)
  })
})
