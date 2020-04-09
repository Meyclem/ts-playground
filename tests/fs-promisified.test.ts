// @ts-nocheck

import { promisifiedReadFile } from "../src/lib/fs-promisified"

describe("#promisifiedReadFile", () => {
  it("Must take one argument", () => {
    expect.assertions(1)

    expect(promisifiedReadFile.length).toBe(1)
  })

  it("Must return a promise", () => {
    expect.assertions(2)
    const promise = promisifiedReadFile("./src/lib/fs-promisified/user.json")
    expect(typeof promise.then).toBe("function")
    expect(typeof promise.catch).toBe("function")
  })
})
