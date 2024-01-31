import { useState } from "react"
import { Header } from "./components/Header"
import { Input } from "./components/Input"
import { Stats } from "./components/Stats"

function App() {
  const [showStats, setShowStats] = useState(false)
  const [analysedInput, setAnalysedInput] = useState("")
  const [selectedWords, setSelectedWords] = useState("")

  const analyseInput = (input) => {
    const inputObj = {
      text: input.text,
      sentences: [
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
        [
          "Ahjusuu ees iste, selle ees vokk, saviku lähedal pihijalg põleva peeruga.",
        ],
        ["Hiline talveõhtu, õues torm ja aeg-ajalt huntide ulumine."],
      ],
      words: [
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
      ],
      lemmas: [
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
      ],
    }

    setShowStats(!showStats)
    setAnalysedInput(inputObj)
  }

  //highlight selected lemma
  const showLemma = (lemma) => {
    let content = []
    for (let i = 0; i < analysedInput.lemmas.length; i++) {
      let word = analysedInput.words[i].toLowerCase()
      if (analysedInput.lemmas[i] === lemma && content.indexOf(word) < 0) {
        content.push(word)
      }
    }
    setSelectedWords(content)
  }

  //highlight selected word
  const showWord = (word) => {
    let content = []
    content.push(word)
    setSelectedWords(content)
  }

  return (
    <div className="container">
      <Header />
      <Input onInsert={analyseInput} onShowWords={selectedWords} />
      {showStats && (
        <Stats
          onAnalyse={analysedInput}
          onSelectLemma={showLemma}
          onSelectWord={showWord}
        />
      )}
    </div>
  )
}

export default App
