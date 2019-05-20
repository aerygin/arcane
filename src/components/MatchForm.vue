<template>
    <div class="form-wrapper">
        <b-form v-on:submit.prevent="submit()">
            <b-form-group class="inpt-grp" label="Sport:" label-for="input-1">
                <b-form-select
                        @change="onSportSelect()"
                        id="input-1"
                        v-model="form.id"
                        required>
                    <option value="" disabled hidden>Select Sport</option>
                    <option v-for="(sport, index) of sports"
                            selected
                            :key="index"
                            :value="sport.id">
                        {{index}}. {{sport.name}}
                    </option>
                </b-form-select>
            </b-form-group>
            <b-form-group v-if="sportSelected" class="inpt-grp" label="Tournament:" label-for="input-2">
                <b-form-select
                        @change="onTournamentSelect()"
                        id="input-2"
                        v-model="form.tournament"
                        required>
                    <option v-for="(tour, index) of availableTournaments"
                            :key="index"
                            :value="tour"
                            :selected="availableTournaments[1]">
                        {{tour.name}} {{tour.sport.name}}
                    </option>
                </b-form-select>
            </b-form-group>
            <b-form-group v-if="sportSelected" class="inpt-grp" label="Match Position:" label-for="input-3">
                <b-form-select
                        @change="onTournamentSelect()"
                        id="input-3"
                        v-model="form.position"
                        required>
                    <option v-for="(pos, index) of positions"
                            :key="index"
                            :value="pos">
                        {{pos}}
                    </option>
                </b-form-select>
            </b-form-group>
            <b-form-group v-if="tournamentSelected" class="inpt-grp" label="Competitor 1:" label-for="competitor-1">
                <b-form-input
                        id="competitor-1"
                        v-model="form.competitorOneName"
                        required
                        placeholder="Competitor 1">
                </b-form-input>
            </b-form-group>

            <b-form-group v-if="tournamentSelected" class="inpt-grp" label="Competitor 2:" label-for="competitor-2">
                <b-form-input
                        id="competitor-2"
                        v-model="form.competitorTwoName"
                        required
                        placeholder="Competitor 2">
                </b-form-input>
            </b-form-group>

            <div class="buttons-wrapper">
                <b-button type="submit" variant="primary">Submit</b-button>
                <b-button type="button" variant="danger" @click="$emit('cancel')">Cancel</b-button>
            </div>
        </b-form>
  </div>
</template>

<script>
    import tournaments from '@/fixtures/tournaments'
    import sports from '@/fixtures/sports'

    export default {
        props: {
            result: Array
        },
    data () {
      return {
        form: {
            id: '',
            name: '',
          competitorOneName: '',
          competitorTwoName: '',
          tournament: {},
          position: 0
        },
          sportSelected: false,
          tournamentSelected: false,
          availableTournaments: [],
          tournaments,
          sports,
          positions: [0, 1, 2, 3, 4, 5]
      }
    },
        methods: {
            onSportSelect() {
                this.sportSelected = true;
                this.availableTournaments = tournaments.filter(i => i.sport.id === this.form.id)
            },

            onTournamentSelect() {
                this.tournamentSelected = true;
            },

            submit() {
                const sport = this.result.find(k => k.id === this.form.id)
                const tournament = sport.tournaments.find(i => i.id === this.form.tournament.id);
                tournament.matches.push(
                    {
                        id: this.result.length + 1,
                        competitors: [
                            {name: this.form.competitorOneName},
                            {name: this.form.competitorTwoName}
                        ],
                        name: 'MATCH: ' + sport.name + ', ' + tournament.name,
                        tournament: tournament,
                        position: this.form.position
                    }
                )
                tournament.matches.sort((a, b) => {
                    return a.position - b.position;
                })

            },
        },

        beforeMount() {
            sports.sort((a, b) => {
                return a.position - b.position
            })
        }
  }
</script>

