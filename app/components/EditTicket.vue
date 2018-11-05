<template>
    <Page class="page">
        <ActionBar title="Edit ticket">
            <ActionItem @tap="remove" v-if="edit === true" text="Remove"
                android.position="actionBar" ios.position="right" />
        </ActionBar>
        <ScrollView>
            <StackLayout>
                <TextField class="text" v-model="ticketName" hint="Ticket name" />
                <TextView class="textarea" v-model="ticketText" editable="true"
                    hint="Ticket description"></TextView>
                <Button class="button" text="Save ticket" @tap="save" />
            </StackLayout>
        </ScrollView>
    </Page>
</template>

<script>
    import * as ApplicationSettings from "application-settings";

    export default {
        props: ["ticket", "edit"],
        created() {
            this.edit = this.$props.edit;
            this.ticketId = this.$props.ticket.id;
            this.ticketName = this.$props.ticket.name;
            this.ticketText = this.$props.ticket.text;
        },
        methods: {
            remove() {
                this.$root.tickets.splice(this.ticketId, 1);
                this.$navigateBack();

                ApplicationSettings.setString(
                    "tickets",
                    JSON.stringify(this.$root.tickets)
                );

                console.log("mentve");
                this.$navigateBack();
            },
            save() {
                if (this.edit === true) {
                    for (var i = 0; i < this.$root.tickets.length; i++) {
                        if (this.$root.tickets[i].id == this.ticketId) {
                            this.$root.tickets.splice(i, 1, {
                                id: this.ticketId,
                                name: this.ticketName,
                                text: this.ticketText
                            });

                            ApplicationSettings.setString(
                                "tickets",
                                JSON.stringify(this.$root.tickets)
                            );
                            this.$navigateBack();
                        }
                    }
                } else {
                    this.$root.tickets.push({
                        id: this.ticketId,
                        name: this.ticketName,
                        text: this.ticketText
                    });

                    ApplicationSettings.setString(
                        "tickets",
                        JSON.stringify(this.$root.tickets)
                    );

                    console.log("mentve");
                    this.$navigateBack();
                }
            }
        },

        data() {
            return {
                edit: false,
                ticketId: 0,
                ticketName: "",
                ticketText: ""
            };
        }
    };
</script>

<style>
    .button {
        border-width: 1;
        border-color: #ddd;
        border-radius: 4;
        padding: 8;
        margin: 8;
        font-size: 22;
    }

    .text {
        border-width: 1;
        border-bottom-color: #ddd;
        padding: 4;
        margin: 16 8;
        font-size: 22;
    }

    .textarea {
        border-width: 1;
        border-bottom-color: #ddd;
        margin: 16 8;
        height: 250;
        font-size: 22;
    }
</style>