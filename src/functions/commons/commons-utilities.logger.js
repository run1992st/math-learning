import FORMATTER from "./commons-utilities.text"
export { standardLogger }

function standardLogger(loggingObject) {
  const parent = new LogSection(loggingObject.name)

  const params = loggingObject.params
  const type = loggingObject.type
  const output = loggingObject.output

  const header = new LogSection("Metadata")
  header.printToConsole([type])
  header.close()

  const body = new LogSection("Params")
  body.printToTable(params)
  body.printToTable(output)
  body.close()

  parent.close()
}

class LogSection {
  constructor(sectionName) {
    this.sectionName = sectionName
    console.group(sectionName)
  }

  printToConsole(consoleArguments) {
    console.log(...consoleArguments)
  }
  printToTable(objectToTable) {
    console.table(objectToTable)
  }
  close() {
    console.groupEnd(this.sectionName)
  }
}
