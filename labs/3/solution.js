import fs from "fs"

class Student {
  constructor(name, fn) {
    this.name = name
    this.fn = fn
  }
}

class Grades {
  constructor(fn, grades) {
    this.fn = fn
    this.grades = grades
  }
}

class UniClass {
  constructor(name, credits) {
    this.name = name
    this.credits = credits
  }
}

class Score {
    constructor(subject,score) {
        this.subject = subject
        this.score = score
    }
}

fs.readFile("./data/students.txt", { encoding: "utf8" }, (err, res) => {
  if (err) {
    console.log(err)
    return err
  }

  const students = res
    .toString()
    .split("\r\n")
    .map((line) => {
      if (line === "#") {
        return ""
      }
      const commentStartIndex = line.indexOf("#")
      if (commentStartIndex !== -1) {
        if (commentStartIndex !== line.length - 1)
          return line.slice(0, commentStartIndex)
      }
      return line
    })
    .filter((line) => line.length > 0)
    .map((student) => {
      const data = student.split(" ")
      const fn = data[data.length - 1]
      const name = data.slice(0, data.length - 1).join(" ")
      return new Student(name, fn)
    })

  fs.readFile("./data/marks.txt", { encoding: "utf-8" }, (err, res) => {
    if (err) {
      console.log(err)
      return err
    }

    const marks = res
      .toString()
      .split("\r\n")
      .map((line) => {
        if (line === "#") {
          return ""
        }
        const commentStartIndex = line.indexOf("#")
        if (commentStartIndex !== -1) {
          if (commentStartIndex !== line.length - 1)
            return line.slice(0, commentStartIndex)
        }
        return line
      })
      .filter((line) => line.length > 0)
      .map((marks) => {
        const dataAsArr = marks.split(" ")
        const fn = dataAsArr[0]
        const grades = dataAsArr
          .slice(1)
          .map((grade) => (grade === "xxx" ? "0.00" : grade))
        return new Grades(fn, grades)
      })
    console.log(marks)

    fs.readFile("./data/credits.txt", { encoding: "utf-8" }, (err, res) => {
      if (err) {
        console.log(err)
        return err
      }

      const classes = []
      const classData = res.toString().replace("\r\n", " ").split(" ")
      for (let i = 0; i < classData.length / 2; i++) {
        classes.push(
          new UniClass(classData[i], classData[classData.length / 2 + i])
        )
      }
      console.log(classes)

      const grouped = students.map((student) => {
        const currMarks = marks.find((grade) => grade.fn === student.fn)
        const scores = currMarks.grades.map((grade, index) => {
          const subject = classes[index]
          return { [subject.name]: (grade / 6) * subject.credits }
        })
        
        return { name: student.name, ...scores }

      })



    
      console.log(grouped,grouped.map(x => x.scores))
    })
  })
  console.log(students)
})
