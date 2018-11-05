<template>
    <Page class="page">
        <ActionBar title="Tickets">
            <ActionItem @tap="onAddTap" text="Add" android.position="actionBar"
                ios.position="right" />
        </ActionBar>
        <ScrollView>
            <StackLayout class="home-panel">
                <ListView class="list-group" for="ticket in tickets" @itemTap="onTicketTap"
                    style="height:1250px; width: 100%">
                    <v-template>
                        <FlexboxLayout flexDirection="row" class="list-group-item">
                            <Label :text="ticket.name" class="list-group-item-heading"
                                style="width: 60%" />
                        </FlexboxLayout>
                    </v-template>
                </ListView>
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import EditTicket from "./EditTicket";

    export default {
        props: ["foo"],
        methods: {
            onTicketTap: function(ticket) {
                this.$navigateTo(EditTicket, {
                    props: {
                        edit: true,
                        ticket: this.tickets[ticket.index]
                    }
                });
            },

            onAddTap: function() {
                var increment = 0;
                if (this.$root.tickets.length > 0) {
                    increment =
                        this.$root.tickets[this.$root.tickets.length - 1]
                        .id + 1;
                }

                this.$navigateTo(EditTicket, {
                    props: {
                        edit: false,
                        ticket: {
                            id: increment,
                            name: "",
                            text: ""
                        }
                    }
                });
            }
        },
        data() {
            return {
                tickets: this.$root.tickets
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 0;
        padding: 0;
    }

    .list-group {
        margin: 0;
        padding: 0;
    } 
    
    .description-label {
        margin-bottom: 15;
    }
</style>