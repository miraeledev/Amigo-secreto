//O principal objetivo deste desafio é fortalecer suas habilidades em lógica de programação. Aqui você deverá desenvolver a lógica para resolver o problema.
import { sortearAmigo } from './sortearAmigo.js';
import { adicionarParticipante } from './adicionarParticipante.js';
public class listaParticipantes {
    constructor() {
        this.participantes = [];
    }

    adicionar(nome) {
        if (nome && !this.participantes.includes(nome)) {
            this.participantes.push(nome);
            return true;
        }
        return false;
    }

    sortear() {
        if (this.participantes.length < 2) {
            throw new Error("É necessário pelo menos dois participantes para sortear.");
        }
        const shuffled = [...this.participantes].sort(() => Math.random() - 0.5);
        const sorteados = {};
        for (let i = 0; i < shuffled.length; i++) {
            sorteados[shuffled[i]] = shuffled[(i + 1) % shuffled.length];
        }
        return sorteados;
    }
}