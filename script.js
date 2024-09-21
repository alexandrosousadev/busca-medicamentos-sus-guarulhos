const form = document.getElementById('buscar-form');
const estado = document.getElementById('estado');
const resultado = document.getElementById('resultado');

let dataGuarulhos;
let dataEstadoSp;

async function carregaArquivosJson() {
	try {
		dataGuarulhos = await fetch('data_guarulhos.json').then((response) =>
			response.json()
		);
		dataEstadoSp = await fetch('data_estado_sp.json').then((response) =>
			response.json()
		);
	} catch (error) {
		console.error(error);
	}
}

function buscaRemedio(nomeRemedio, incluiEstadoSp) {
	if (resultado.innerText !== 'Erro ao carregar os dados.') {
		const nomeRemedioFormatado =
			nomeRemedio[0]?.toUpperCase() + nomeRemedio?.slice(1) || undefined;
		let resultadoGuarulhos = '';
		let resultadoEstadoSp = '';
		let resultadoFinal = '';

		const medicamentoEmGuarulhos = dataGuarulhos?.find(
			(obj) => obj.nome.split(' ')[0].toLowerCase() === nomeRemedio
		);
		const medicamentoEmSp =
			incluiEstadoSp &&
			dataEstadoSp?.find(
				(obj) => obj.nome.split(' ')[0].toLowerCase() === nomeRemedio
			);

		resultadoGuarulhos = !!medicamentoEmGuarulhos
			? `Medicamento ${medicamentoEmGuarulhos?.nome} disponível em Guarulhos:\n ${medicamentoEmGuarulhos.endereco.nome} - Endereço: ${medicamentoEmGuarulhos.endereco.endereco}`
			: '';

		resultadoEstadoSp = !!medicamentoEmSp
			? `Medicamento ${nomeRemedioFormatado} disponível no estado de São Paulo.`
			: '';

		resultadoFinal =
			resultadoGuarulhos.length > 0 && resultadoEstadoSp.length > 0
				? `${resultadoGuarulhos}. \nDisponível também no estado de São Paulo.`
				: resultadoGuarulhos.length > 0
				? `${resultadoGuarulhos}.`
				: resultadoEstadoSp || 'Nenhum medicamento encontrado com esse nome.';

		return resultadoFinal;
	}
}

carregaArquivosJson();

form.addEventListener('submit', function (event) {
	event.preventDefault();
	const medicamento = document
		.getElementById('medicamento')
		.value.toLowerCase();

	const resultadoBusca =
		buscaRemedio(medicamento, estado.checked) || 'Erro ao carregar os dados.';

	resultado.innerText = resultadoBusca;
});
