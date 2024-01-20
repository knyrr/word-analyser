let input =
  "Must ja nõgine rehetare. Ahjus hõõgub tuli ja punetab sealt seinte peale. Ahju ees savik (müüritud iste), kolde kohal ahela otsas pada. Ahju kõrval pink, kartsas ja vanaema voodi. Teisel pool vastasnurgas uhmripakk, leivalabidas ja muud koli, seinas soone peal kinni- ja lahtilükatav uks, pulk sees, ja all nurga sees kassiauk. Ukse peal lahtine laud, mille kaudu valgust sisse ja suitsu välja võib lasta; ukse kõrval sulase voodi. Tagaseinas väike sagarate peal käiv uks, lingi asemel köieots. Ahjusuu ees iste, selle ees vokk, saviku lähedal pihijalg põleva peeruga. Hiline talveõhtu, õues torm ja aeg-ajalt huntide ulumine."
let sentences = [
  ["Must ja nõgine rehetare."],
  ["Ahjus hõõgub tuli ja punetab sealt seinte peale."],
  ["Ahju ees savik (müüritud iste), kolde kohal ahela otsas pada."],
  ["Ahju kõrval pink, kartsas ja vanaema voodi."],
  [
    "Teisel pool vastasnurgas uhmripakk, leivalabidas ja muud koli, seinas soone peal kinni- ja lahtilükatav uks, pulk sees, ja all nurga sees kassiauk.",
  ],
  [
    "Ukse peal lahtine laud, mille kaudu valgust sisse ja suitsu välja võib lasta; ukse kõrval sulase voodi.",
  ],
  ["Tagaseinas väike sagarate peal käiv uks, lingi asemel köieots."],
  ["Ahjusuu ees iste, selle ees vokk, saviku lähedal pihijalg põleva peeruga."],
  ["Hiline talveõhtu, õues torm ja aeg-ajalt huntide ulumine."],
]
let words = [
  "Must",
  "ja",
  "nõgine",
  "rehetare",
  "Ahjus",
  "hõõgub",
  "tuli",
  "ja",
  "punetab",
  "sealt",
  "seinte",
  "peale",
  "Ahju",
  "ees",
  "savik",
  "müüritud",
  "iste",
  "kolde",
  "kohal",
  "ahela",
  "otsas",
  "pada",
  "Ahju",
  "kõrval",
  "pink",
  "kartsas",
  "ja",
  "vanaema",
  "voodi",
  "Teisel",
  "pool",
  "vastasnurgas",
  "uhmripakk",
  "leivalabidas",
  "ja",
  "muud",
  "koli",
  "seinas",
  "soone",
  "peal",
  "kinni-",
  "ja",
  "lahtilükatav",
  "uks",
  "pulk",
  "sees",
  "ja",
  "all",
  "nurga",
  "sees",
  "kassiauk",
  "Ukse",
  "peal",
  "lahtine",
  "laud",
  "mille",
  "kaudu",
  "valgust",
  "sisse",
  "ja",
  "suitsu",
  "välja",
  "võib",
  "lasta",
  "ukse",
  "kõrval",
  "sulase",
  "voodi",
  "Tagaseinas",
  "väike",
  "sagarate",
  "peal",
  "käiv",
  "uks",
  "lingi",
  "asemel",
  "köieots",
  "Ahjusuu",
  "ees",
  "iste",
  "selle",
  "ees",
  "vokk",
  "saviku",
  "lähedal",
  "pihijalg",
  "põleva",
  "peeruga",
  "Hiline",
  "talveõhtu",
  "õues",
  "torm",
  "ja",
  "aeg-ajalt",
  "huntide",
  "ulumine",
]
let lemmas = [
  "must",
  "ja",
  "nõgine",
  "rehetare",
  "ahi",
  "hõõguma",
  "tuli",
  "ja",
  "punetama",
  "sealt",
  "sein",
  "peale",
  "ahi",
  "ees",
  "savik",
  "müüri=tud",
  "iste",
  "kolle",
  "kohal",
  "ahel",
  "otsas",
  "pada",
  "ahi",
  "kõrval",
  "pink",
  "kartsa",
  "ja",
  "vana_ema",
  "voodi",
  "teine",
  "pool",
  "vastas_nurk",
  "uhmri_pakk",
  "leiva_labi",
  "ja",
  "muu",
  "koli",
  "sein",
  "soone",
  "peal",
  "kinn",
  "ja",
  "lahti_lükatav",
  "uks",
  "pulk",
  "sees",
  "ja",
  "all",
  "nurk",
  "sees",
  "kassi_auk",
  "uks",
  "peal",
  "lahtine",
  "laud",
  "mis",
  "kaudu",
  "valgus",
  "sisse",
  "ja",
  "suits",
  "välja",
  "võima",
  "laskma",
  "uks",
  "kõrval",
  "sulane",
  "voodi",
  "taga_sein",
  "väike",
  "sagar",
  "peal",
  "käiv",
  "uks",
  "ling",
  "asemel",
  "köi_eots",
  "ahju_suu",
  "ees",
  "iste",
  "see",
  "ees",
  "vokk",
  "savik",
  "lähedal",
  "pihi_jalg",
  "põlev",
  "peer",
  "hiline",
  "talve_õhtu",
  "õu",
  "torm",
  "ja",
  "aeg-ajalt",
  "hunt",
  "ulumine",
]

let lemmasSet = new Set()
let lemmasMap = new Map()
let wordFormFrequencyMap = new Map()

window.onload = function () {
  textInput.value = input
  analyseBtn.addEventListener("click", analyse)
}

function analyse() {
  textInput.style.display = "none"
  analyseBtn.style.display = "none"
  textInputFrame.style.display = "block"
  textInputFrame.innerHTML = input

  for (let i = 0; i < lemmas.length; i++) {
    let currentWord = words[i].toLowerCase()
    if (lemmasMap.has(lemmas[i])) {
      let newObj = lemmasMap.get(lemmas[i])
      newObj.count++
      let isUnique = true
      for (let i = 0; i < newObj.items.length; i++) {
        if (currentWord == newObj.items[i]) {
          isUnique = false
          break
        }
      }
      if (isUnique) {
        newObj.items.push(currentWord)
      }
      lemmasMap.set(lemmas[i], newObj)
    } else {
      let newObj = { name: "", items: [], count: 0 }
      newObj.name = lemmas[i]
      newObj.items[0] = currentWord
      newObj.count = 1
      lemmasMap.set(lemmas[i], newObj)
    }

    if (!wordFormFrequencyMap.get(currentWord)) {
      wordFormFrequencyMap.set(currentWord, 1)
    } else {
      let num = wordFormFrequencyMap.get(currentWord)
      wordFormFrequencyMap.set(currentWord, num + 1)
    }
  }
  buildTable()
}

function buildTable() {
  let sortedMap = new Map([...lemmasMap].sort(compareFrequency))
  sortedMap.forEach((value, key) => {
    let newObj = value
    let sortedItems = value.items.sort((a, b) => a.localeCompare(b))
    newObj.items = sortedItems
    sortedMap.set(key, newObj)
  })

  let table = document.createElement("table")
  table.setAttribute("id", "lemmaTable")
  let thead = document.createElement("thead")
  let tbody = document.createElement("tbody")
  table.appendChild(thead)
  table.appendChild(tbody)

  let row_1 = document.createElement("tr")
  let heading_1 = document.createElement("th")
  heading_1.innerHTML = "Algvormid"
  let heading_2 = document.createElement("th")
  heading_2.innerHTML = "Sõnavormid"
  let heading_3 = document.createElement("th")
  heading_3.innerHTML = "Sagedus"
  let heading_4 = document.createElement("th")
  heading_4.innerHTML = "Osakaal"
  row_1.appendChild(heading_1)
  row_1.appendChild(heading_2)
  row_1.appendChild(heading_3)
  row_1.appendChild(heading_4)
  thead.appendChild(row_1)

  sortedMap.forEach((value, key) => {
    let row = document.createElement("tr")
    let cell_1 = document.createElement("td")
    cell_1.innerHTML = value.name
    let randomId = "data-" + uuidv4()
    cell_1.setAttribute("id", randomId)
    cell_1.addEventListener("click", lemmaToWord)
    let cell_2 = document.createElement("td")

    for (let i = 0; i < value.items.length; i++) {
      let wordSpan = document.createElement("span")
      let randomId = "data-" + uuidv4()
      wordSpan.innerHTML =
        value.items[i] + " (" + wordFormFrequencyMap.get(value.items[i]) + ")"
      if (value.items[i + 1]) {
        wordSpan.innerHTML += "; "
      }
      wordSpan.setAttribute("id", randomId)
      wordSpan.addEventListener("click", wordToWord)
      cell_2.appendChild(wordSpan)
    }
    let cell_3 = document.createElement("td")
    cell_3.innerHTML = value.count
    let cell_4 = document.createElement("td")
    cell_4.innerHTML =
      Math.round((value.count / words.length) * 100 * 100) / 100 + "%"

    row.appendChild(cell_1)
    row.appendChild(cell_2)
    row.appendChild(cell_3)
    row.appendChild(cell_4)
    tbody.appendChild(row)
  })

  document.querySelector("#outputTable").appendChild(table)
}

function compareFrequency(a, b) {
  if (a[1].count === b[1].count && String(a[0]).localeCompare(b[0]) === 0) {
    return 0
  } else if (a[1].count != b[1].count) {
    return b[1].count < a[1].count ? -1 : 1
  } else {
    return String(a[0]).localeCompare(b[0]) < 0 ? -1 : 1
  }
}

function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
    (
      c ^
      (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
    ).toString(16)
  )
}

function wordToWord(e) {
  let selectedWord = e.target.textContent
  selectedWord = selectedWord.replace(/ .*/, "")
  let origInput = input
  let regex = new RegExp("\\b" + selectedWord + "\\b", "ig")
  let highlightedInput = origInput.replace(regex, "<mark>$&</mark>")
  textInputFrame.innerHTML = highlightedInput
}

function lemmaToWord(e) {
  let selectedLemma = e.target.textContent
  let highlightedInput = input

  for (let i = 0; i < lemmasMap.get(selectedLemma).items.length; i++) {
    let selectedWord = lemmasMap.get(selectedLemma).items[i]
    selectedWord = selectedWord.replace(/ .*/, "")

    let regex = new RegExp("\\b" + selectedWord + "\\b", "ig")
    highlightedInput = highlightedInput.replace(regex, "<mark>$&</mark>")
  }
  textInputFrame.innerHTML = highlightedInput
}
