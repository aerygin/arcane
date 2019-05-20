import tournaments from './tournaments'
import competitors from './competitors'
import sports from './sports'


let matches = []
let competitorsIndex = 0

tournaments.forEach((tournament) => {

  [2, 0, 1].forEach((position) => {
    matches.push({
      id: (matches.length + 1),
        name: `MATCH: ${tournament.sport.name}, ${tournament.name}`,
      competitors: [
        { name: competitors[competitorsIndex] },
        { name: competitors[competitorsIndex + 1] }
      ],
      tournament: tournament,
      position: position
    })

    competitorsIndex += 2
  })
})



// Now `result` looks like this:
/*{
    "1": {
    id: "sport-id",
        name: "sport-name",
        tournaments: [
        {
            id: "tournament-id",
            name: "tournament-name",
            matches: [
                {
                    id: "match-id",
                    name: "match-name",
                }
            ]
        }
    ]
}*/


export default matches


