<template>
    <b-row>
    <b-col>
        <match-form :result="result" v-if="formVisible" @cancel="formVisible = false" class="mb-5"/>
        <div class="button-wrapper">
            <b-button @click="formVisible = true" class="mb-5 add-btn" v-if="!formVisible">Add match</b-button>
        </div>
        <div style="margin-bottom: 20px"
             v-for="(r, index) of result"
             :key="index">
            <h4>{{r.position}}. {{r.name}}</h4>
            <div v-for="(tournament, index) of r.tournaments"
                 :key="index">
                <div v-if="tournament.sport.name === r.name">
                    <div class="match-header">{{tournament.position}}. {{tournament.name}} :
                    </div>
                    <div v-for="(match, index) of tournament.matches"
                         :key="index">
                        <div class="match-item">
                            <div class="table">
                                <div class="tr">
                                    <div class="td" id="match-name">
                                        {{match.position}}. {{match.name}}
                                    </div>
                                    <div class="td">
                                        {{match.competitors[0].name}}
                                    </div>
                                    <div class="td vs">
                                        <span>VS</span>
                                    </div>
                                    <div class="td">
                                        {{match.competitors[1].name}}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </b-col>
  </b-row>
</template>

<script>
    import matches from '@/fixtures/matches'
    import MatchForm from './MatchForm'


    export default {
        components: {
            MatchForm
        },
        data() {
            return {
                formVisible: false,
                matches,
                result: {},
            }
        },

        methods: {
            restructureAndSort: function () {
                const result = [];
                const tmpTournaments = {}

                matches.forEach((match) => {
                    const tournament = match.tournament
                    const sport = tournament.sport

                    if (!tmpTournaments[tournament.id]) {
                        tmpTournaments[tournament.id] = {
                            ...tournament,
                            matches: []
                        }
                    }
                    tmpTournaments[tournament.id].matches.push(match)

                    if (!result[sport.id]) {
                        result[sport.id] = {
                            ...sport,
                            tournaments: []
                        }
                    }
                    result[sport.id].tournaments = tmpTournaments
                })

                this.sortBySport(result);
                this.sortByTournamentAndPosition();


            },

            sortBySport(obj) {
                this.result = Object.values(obj).sort((a, b) => {
                    return a.position - b.position
                })
            },

            sortByTournamentAndPosition() {
                for (let i = 0; i < this.result.length; i++) {
                    let tempTournaments = Object.values(this.result[i].tournaments);
                    tempTournaments.sort((a, b) => {
                        return a.position - b.position
                    })
                    tempTournaments.forEach((c) => {
                        c.matches.sort((c, d) => {
                            return c.position - d.position
                        })
                    })

                    this.result[i].tournaments = tempTournaments
                }
            }
        },
        beforeMount() {
            this.restructureAndSort();
        }
    }
</script>

<style>

    .match-header {
        font-size: 20px;
        margin: 10px 0;
    }

    .match-item {
        display: flex;
        border: 1px solid #ced4da;
        padding: 15px;
        border-radius: 5px;
        font-size: 18px;
        margin-bottom: 10px;
    }

    .add-btn {
        padding: 10px 20px;
    }

    .button-wrapper {
        display: flex;
        justify-content: center;
    }

    .vs {
        font-weight: 600;
    }

    #match-name {
        width: 250px;
    }

    .table {
        display: table;
        margin-bottom: 0 !important;
    }

    .tr {
        display: table-row;
    }

    .td {
        display: table-cell;
        width: 100px;
    }

    .td:nth-child(n+2) {
        text-align: center;
    }

</style>