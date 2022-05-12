Vue.config.devtools = true;

dayjs.extend(window.dayjs_plugin_customParseFormat);

const app = new Vue (
    {
        el : '#root',
        data: {
            contacts: [
                {
                    name: 'Michele',
                    avatar: '_1',
                    visible: true,
                    messages: [
                        {
                            date: '05/05/2022 15:30:55',
                            message: 'Hai portato a spasso il cane?',
                            status: 'sent'
                        },
                        {
                            date: '05/05/2022 15:50:00',
                            message: 'Ricordati di stendere i panni',
                            status: 'sent'
                        },
                        {
                            date: '05/05/2022 16:15:22',
                            message: 'Tutto fatto!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Fabio',
                    avatar: '_2',
                    visible: true,
                    messages: [
                        {
                            date: '20/04/2022 16:30:00',
                            message: 'Ciao come stai?',
                            status: 'sent'
                        },
                        {
                            date: '20/04/2022 16:30:55',
                            message: 'Bene grazie! Stasera ci vediamo?',
                            status: 'received'
                        },
                        {
                            date: '20/04/2022 16:35:00',
                            message: 'Mi piacerebbe ma devo andare a fare la spesa.',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Samuele',
                    avatar: '_3',
                    visible: true,
                    messages: [
                        {
                            date: '28/04/2022 10:10:40',
                            message: 'La Marianna va in campagna',
                            status: 'received'
                        },
                        {
                            date: '28/04/2022 10:20:10',
                            message: 'Sicuro di non aver sbagliato chat?',
                            status: 'sent'
                        },
                        {
                            date: '28/04/2022 16:15:22',
                            message: 'Ah scusa!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro B.',
                    avatar: '_4',
                    visible: true,
                    messages: [
                        {
                            date: '10/04/2022 15:30:55',
                            message: 'Lo sai che ha aperto una nuova pizzeria?',
                            status: 'sent'
                        },
                        {
                            date: '10/04/2022 15:50:00',
                            message: 'Si, ma preferirei andare al cinema',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Alessandro L.',
                    avatar: '_5',
                    visible: true,
                    messages: [
                        {
                            date: '10/04/2022 15:30:55',
                            message: 'Ricordati di chiamare la nonna',
                            status: 'sent'
                        },
                        {
                            date: '10/04/2022 15:50:00',
                            message: 'Va bene, stasera la sento',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Claudia',
                    avatar: '_6',
                    visible: true,
                    messages: [
                        {
                            date: '10/04/2022 15:30:55',
                            message: 'Ciao Claudia, hai novità?',
                            status: 'sent'
                        },
                        {
                            date: '10/04/2022 15:50:00',
                            message: 'Non ancora',
                            status: 'received'
                        },
                        {
                            date: '10/04/2022 15:51:00',
                            message: 'Nessuna nuova, buona nuova',
                            status: 'sent'
                        }
                    ],
                },
                {
                    name: 'Federico',
                    avatar: '_7',
                    visible: true,
                    messages: [
                        {
                            date: '10/04/2022 15:30:55',
                            message: 'Fai gli auguri a Martina che è il suo compleanno!',
                            status: 'sent'
                        },
                        {
                            date: '10/04/2022 15:50:00',
                            message: 'Grazie per avermelo ricordato, le scrivo subito!',
                            status: 'received'
                        }
                    ],
                },
                {
                    name: 'Davide',
                    avatar: '_8',
                    visible: true,
                    messages: [
                        {
                            date: '10/04/2022 15:30:55',
                            message: 'Ciao, andiamo a mangiare la pizza stasera?',
                            status: 'received'
                        },
                        {
                            date: '10/04/2022 15:50:00',
                            message: 'No, l\'ho già mangiata ieri, ordiniamo sushi!',
                            status: 'sent'
                        },
                        {
                            date: '10/04/2022 15:51:00',
                            message: 'OK!!',
                            status: 'received'
                        }
                    ],
                }
            ],
            activeChat: 0,
            newMessage: '',
            botMessage: 'Ciao, va bene :)',
            adesso: dayjs().format('DD/MM/YYYY HH:mm:ss'),
            adessoHHmm: dayjs().format('HH:mm'),
            search: '',
            dropDown: -1    //lo imposto a -1 così non viene visualizzato all'avvio della pagina   
        },

        methods: {
            // prende la chat dell'index del ciclo v-for e la mostra al clic sull'elemento corrispondente
            getActiveChat(index) {
                this.activeChat = index;
            },

            // preleva il messaggio inserito dall'utente e lo pusha nell'array
            myNewMessage() {
                const newMessage = {
                    date: this.adesso,
                    message: this.newMessage.trim(),
                    status: 'sent'
                }
                // push solo se c'è almeno un carattere o numero
                if (this.newMessage.trim().length > 0) {
                    this.contacts[this.activeChat].messages.push(newMessage);
                    // ripulisco il campo
                    this.newMessage ='';
                    // genero la risposta automatica del bot dopo 1,2 sec
                    setTimeout(() => {
                        const botMessage = {
                        date: this.adesso,
                        message: this.botMessage,
                        status: 'received'
                    }
                        // pusho anche questo nell'array per visualizzarlo nella colonna sinistra
                        this.contacts[this.activeChat].messages.push(botMessage);
                    },1200);
                }
            },

            // la funzione ricerca tra i contatti (non nel testo dei messaggi)
            filterSearch() {
                // scorro l'array con il forEach e se le lettere inserite nell'input sono contenute nell'array allora visible è true, altrimenti false
                this.contacts.forEach((element) => {

                    // svolgo la ricerca indifferentemente tra lettere minuscole e maiuscole
                    const filteredName = element.name.toLowerCase();
                    const filteredSearch = this.search.toLowerCase();
                    if (filteredName.includes(filteredSearch)) {
                        element.visible = true;
                    } else {
                        element.visible = false;
                    }
                })
            },

            // cancella il messaggio selezionato
            deleteMessage(index) {
                this.contacts[this.activeChat].messages.splice(index,1);        
            },

            // restituisce giorno, mese scritto a lettere, ora e minuti
            getTime(date) {
                const dayjsDate = dayjs(date, 'DD/MM/YYYY HH:mm:ss');
                return dayjsDate.format('DD MMMM HH:mm'); 
            }
        }
    }
)