<script setup>
  const items = [
    { text: 'Real-Time', icon: 'mdi-clock' },
    { text: 'Audience', icon: 'mdi-account' },
    { text: 'Conversions', icon: 'mdi-flag' },
  ]

</script>


<template>
    <v-container fluid class="footer">
        <v-container>

            <v-row no-gutters>
                <v-col>
                    <v-sheet class="pa-2 ma-2">
                        Footer Bloque 1
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2">
                        Footer Bloque 2
                    </v-sheet>
                </v-col>
                <v-col>
                    <v-sheet class="pa-2 ma-2">
                        Footer Bloque 3
                        <v-list density="confortable">
                            <v-list-subheader>REPORTS</v-list-subheader>

                            <v-list-item v-for="(item, i) in items" :key="i" :value="item" color="primary">
                                <template v-slot:prepend>
                                    <v-icon :icon="item.icon"></v-icon>
                                </template>

                                <v-list-item-title class="text-body-2" v-text="item.text"></v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-sheet>
                </v-col>
            </v-row>
        </v-container>




        <div class="d-flex fill-height justify-center align-center">
            <div class="text-body-2">
                Texto Footer
            </div>
        </div>


    </v-container>
</template>