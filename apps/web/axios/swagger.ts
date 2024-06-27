const swagger = {
	swagger: "2.0",
	info: {
		description:
			"**Versão: 0.4.146 - 05/15/2024 05:44 PM** - _confira o que mudou na [página de Notícias](http://dadosabertos.camara.leg.br/news/noticias.html)_\n\nBem vindo à nova versão do serviço **Dados Abertos** da Câmara dos Deputados!\n\nEsta versão pode entregar dados puros em formatos JSON e XML, e tenta se aderir ao máximo à arquitetura REST.\n\nNesta página você pode conhecer e experimentar as URLs de acesso aos dados, os parâmetros de *query string* que podem ser aplicados para filtrar e selecionar resultados, e as estruturas de dados que são retornadas.\n\nAlém do método HTTP GET, você também pode usar o método HEAD com qualquer dos serviços.\n\nPor padrão, todos os serviços de listagens retornam 15 itens, e o limite por requisição é de 100 itens.\n\n **ATENÇÃO:** Esta versão é ainda incompleta, sujeita a mudanças e não substitui a [versão original do **Dados Abertos**](http://www2.camara.leg.br/transparencia/dados-abertos/dados-abertos-legislativo). Caso você encontre problemas ou queira dar sugestões, por favor entre em [contato](https://dadosabertos.camara.leg.br/contact/contact.html). ",
		version: "0.4.146",
		title: "Novo Dados Abertos",
	},
	host: "dadosabertos.camara.leg.br",
	basePath: "/api/v2",
	tags: [
		{
			name: "Blocos",
		},
		{
			name: "Deputados",
		},
		{
			name: "Eventos",
		},
		{
			name: "Frentes",
		},
		{
			name: "Grupos",
		},
		{
			name: "Legislaturas",
		},
		{
			name: "Partidos",
		},
		{
			name: "Proposições",
		},
		{
			name: "Referências",
		},
		{
			name: "Votações",
		},
		{
			name: "Órgãos",
		},
	],
	produces: ["application/xml", "application/json"],
	paths: {
		"/blocos": {
			get: {
				tags: ["Blocos"],
				summary: "Lista de dados sobre os blocos partidários",
				description:
					'Nas atividades parlamentares, partidos podem se juntar em __blocos partidários__. Quando associados, os partidos passam a trabalhar como se fossem um "partidão", com um só líder e um mesmo conjunto de vice-líderes.\n\nOs blocos só podem existir até o fim da legislatura em que foram criados: na legislatura seguinte, os mesmos partidos, se associados, formam um novo bloco.\n\nEste recurso é uma lista dos blocos em atividade no momento da requisição. Se forem passados números de legislaturas com o parâmetro _idLegislatura_, são listados também os blocos formados e extintos nessas legislaturas.',
				operationId: "blocoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Número(s) identificador(es) de um ou mais bloco(s), separados por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número(s) identificador(es) de uma ou mais legislatura(s), separados por vírgulas. Se presente, faz com que sejam retornados todos os blocos que existiram nessa(s) legislatura(s).",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada: `idLegislatura`, `id` ou `nome`.",
						required: false,
						type: "string",
						default: "nome",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/ResultadoBloco",
							},
						},
					},
				},
			},
		},
		"/blocos/{id}": {
			get: {
				tags: ["Blocos"],
				summary: "Informações sobre um bloco partidário específico",
				description:
					"Retorna informações sobre o bloco identificado por `{id}` além daquelas obtidas na listagem.",
				operationId: "obterBlocoIDUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Número identificador do bloco de partidos.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoBlocoID",
						},
					},
				},
			},
		},
		"/deputados": {
			get: {
				tags: ["Deputados"],
				summary: "Listagem e busca de deputados, segundo critérios",
				description:
					"Retorna uma lista de dados básicos sobre deputados que estiveram em exercício parlamentar em algum intervalo de tempo.\n\nSe não for passado um parâmetro de tempo, como `idLegislatura` ou `dataInicio`, a lista enumerará somente os deputados _em exercício no momento da requisição_.",
				operationId: "obterDeputadosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Número(s) identificador(es) de um deputado, separados por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "nome",
						in: "query",
						description: "Parte nome parlamentar.",
						required: false,
						type: "string",
					},
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número(s) identificador(es) de uma ou mais legislatura(s) de que os parlamentares tenham participado, separados por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "siglaUf",
						in: "query",
						description:
							"Uma ou mais sigla(s) de unidades federativas (estados e Distrito Federal). Uma lista de siglas válidas pode ser obtida em `/referencias/deputados/siglaUf`. Se ausente, serão retornados deputados de todos os estados.",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "siglaPartido",
						in: "query",
						description:
							"Uma ou mais sigla(s) de partidos aos quais sejam filiados os deputados. Para obter as siglas válidas, consulte `/partidos`. __Atenção:__ partidos diferentes podem usar a mesma sigla em diferentes legislaturas!",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "siglaSexo",
						in: "query",
						description:
							"Letra que designe o gênero dos parlamentares que se deseja buscar, sendo M para masculino e F para feminino",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista deve ser ordenada: `id`, `idLegislatura`, `nome`, `siglaUF` ou `siglaPartido`",
						required: false,
						type: "string",
						default: "nome",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/ResultadoDeputado",
							},
						},
					},
				},
			},
		},
		"/deputados/{id}": {
			get: {
				tags: ["Deputados"],
				summary: "Informações detalhadas sobre um deputado específico",
				description:
					" Retorna os dados cadastrais de um parlamentar identificado por `{id}` que, em algum momento da história e por qualquer período, entrou em exercício na Câmara.",
				operationId: "obterDeputadoIDUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoDeputadoID",
						},
					},
				},
			},
		},
		"/deputados/{id}/despesas": {
			get: {
				tags: ["Deputados"],
				summary: "As despesas com exercício parlamentar do deputado",
				description:
					'Dá acesso aos registros de pagamentos e reembolsos feitos pela Câmara em prol do deputado identificado por `{id}`, a título da Cota para Exercício da Atividade Parlamentar, a chamada "cota parlamentar".\n\nA lista pode ser filtrada por mês, ano, legislatura, CNPJ ou CPF de um fornecedor.\n\nSe não forem passados os parâmetros de tempo, o serviço retorna os dados dos __seis meses anteriores à requisição__.',
				operationId: "getDeputadoDespesasUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número(s) de uma ou mais legislatura(s), separados por vírgulas, em que tenham ocorrido as despesas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "ano",
						in: "query",
						description: "Um ou mais ano(s) de ocorrência das despesas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "mes",
						in: "query",
						description:
							"Um ou mais número(s) do(s) mês(es) de ocorrência das despesas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "cnpjCpfFornecedor",
						in: "query",
						description:
							"CNPJ de uma pessoa jurídica, ou CPF de uma pessoa física, fornecedora do produto ou serviço (apenas números)",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista deverá ser ordenada: qualquer um dos campos do retorno, e também `idLegislatura`",
						required: false,
						type: "string",
						default: "ano",
					},
				],
				responses: {
					"200": {
						description:
							"Uma lista de elementos `registroCotas`, cada um sobre uma despesa.",
						schema: {
							$ref: "#/definitions/DeputadoDespesas",
						},
					},
				},
			},
		},
		"/deputados/{id}/discursos": {
			get: {
				tags: ["Deputados"],
				summary: "Os discursos feitos por um deputado em eventos diversos",
				description:
					"Retorna uma lista de informações sobre os pronunciamentos feitos pelo deputado identificado por {id} que tenham sido registrados, em quaisquer eventos, nos sistemas da Câmara.\n\nCaso os parâmetros de tempo (`dataInicio`, `dataFim` e `idLegislatura`) não sejam configurados na requisição, são buscados os discursos ocorridos nos sete dias anteriores ao da requisição.\n\n",
				operationId: "getDeputadoDiscursosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número da(s) legislatura(s), separados por vírgulas, às quais os dados buscados devem corresponder.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Qual dos elementos da representação deverá ser usado para aplicar ordenação à lista.",
						required: false,
						type: "string",
						default: "dataHoraInicio",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de estruturas de dados `discurso`.",
						schema: {
							$ref: "#/definitions/DeputadoDiscurso",
						},
					},
				},
			},
		},
		"/deputados/{id}/eventos": {
			get: {
				tags: ["Deputados"],
				summary: "Uma lista de eventos com a participação do parlamentar",
				description:
					"Retorna uma lista de objetos `evento` nos quais a participação do parlamentar identificado por `{id}` era ou é prevista.\n\nUm período de tempo pode ser delimitado para a busca.\n\nSe não forem passados parâmetros de tempo, são retornados os eventos num período de __cinco dias__, sendo dois antes e dois depois do dia da requisição.\n\nOs itens podem ser ordenados por `id`, `siglaOrgao` ou `dataHoraInicio`.",
				operationId: "getEventoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Qual dos elementos da representação deverá ser usado para aplicar ordenação à lista.",
						required: false,
						type: "string",
						default: "dataHoraInicio",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Eventos",
						},
					},
				},
			},
		},
		"/deputados/{id}/frentes": {
			get: {
				tags: ["Deputados"],
				summary: "As frentes parlamentares das quais um deputado é integrante",
				description:
					"Retorna uma lista de informações básicas sobre as frentes parlamentares das quais o parlamentar identificado por `{id}` seja membro, ou, no caso de frentes existentes em legislaturas anteriores, tenha encerrado a legislatura como integrante.\n\n",
				operationId: "getDeputadoDiscursosUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de estruturas de dados `frente_`.",
						schema: {
							$ref: "#/definitions/Frente",
						},
					},
				},
			},
		},
		"/deputados/{id}/historico": {
			get: {
				tags: ["Deputados"],
				summary: "Lista de mudanças no exercício parlamentar de um deputado",
				description:
					"Um deputado pode, no meio de uma legislatura, mudar de partido ou de nome parlamentar, entrar em licença, ser afastado ou substituir outro deputado. Como essas mudanças se refletem em votações, ou na autoria e relatoria de proposições, pode se tornar difícil identificar um mesmo parlamentar em diferentes momentos de sua atuação na Câmara.\n\nEste serviço retorna uma listagem com as diferentes situações de exercício parlamentar do deputado identificado por `{id}`, mesmo que a alteração registrada não tenha afetado o andamento do mandato.\n\n",
				operationId: "getDeputadoHistoricoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de estruturas de dados `historico`.",
						schema: {
							$ref: "#/definitions/DeputadoHistorico",
						},
					},
				},
			},
		},
		"/deputados/{id}/mandatosExternos": {
			get: {
				tags: ["Deputados"],
				summary:
					"Outros cargos eletivos já exercidos pelo parlamentar em sua carreira.",
				description:
					"Retorna uma lista em que cada item traz informações básicas sobre um cargo para o qual o parlamentar identificado por {id} tenha sido eleito, em sua carreira política fora da Câmara dos Deputados. Estes dados são fornecidos pelo Tribunal Superior Eleitoral. A lista vem ordenada cronologicamente, por padrão.",
				operationId: "buscarUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/DeputadoMandatoExterno",
						},
					},
				},
			},
		},
		"/deputados/{id}/ocupacoes": {
			get: {
				tags: ["Deputados"],
				summary: "Os empregos e atividades que o(a) deputado(a) já teve",
				description:
					"Enumera as atividades profissionais ou ocupacionais que o deputado identificado por `{id}` já teve em sua carreira e declarou à Câmara dos Deputados.\n\n*ATENÇÃO:* Há problemas reconhecidos de estruturação nesses dados. Os casos encontrados podem ser reportados ao Centro de Documentação e Informação da Câmara, por meio do endereço https://camara.leg.br/faleconosco .",
				operationId: "getOcupacoesDeputadosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico da entidade.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de estruturas de dados `ocupacao_`.",
						schema: {
							$ref: "#/definitions/DeputadoOcupacoes",
						},
					},
				},
			},
		},
		"/deputados/{id}/orgaos": {
			get: {
				tags: ["Deputados"],
				summary: "Os órgãos dos quais um deputado é integrante",
				description:
					"Retorna uma lista de órgãos, como as comissões e procuradorias, dos quais o deputado identificado por `{id}` participa ou participou durante um intervalo de tempo.\n\nCada item identifica um órgão, o cargo ocupado pelo parlamentar neste órgão (como presidente, vice-presidente, titular ou suplente) e as datas de início e fim da ocupação deste cargo.\n\nSe não for passado algum parâmetro de tempo, são retornados os órgãos ocupados pelo parlamentar __no momento da requisição__. Neste caso a lista será vazia se o deputado não estiver em exercício.",
				operationId: "getDeputadoOrgaosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo de dados pelo qual a lista deve ser ordenada: `idOrgao`, `siglaOrgao`, `nomeOrgao`, `titulo`, `dataInicio` ou `dataFim`",
						required: false,
						type: "string",
						default: "dataInicio",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/DeputadoOrgao",
						},
					},
				},
			},
		},
		"/deputados/{id}/profissoes": {
			get: {
				tags: ["Deputados"],
				summary:
					"As profissões que o parlamentar declarou à Câmara que já exerceu ou que pode exercer pela sua formação e/ou experiência",
				description:
					"Retorna uma lista de dados sobre profissões que o parlamentar identificado por `{id}` declarou à Câmara que já exerceu ou que pode exercer pela sua formação e/ou experiência.\n\n",
				operationId: "getDeputadoProfissaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico do parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de estruturas de dados `profissao_`.",
						schema: {
							$ref: "#/definitions/Frente",
						},
					},
				},
			},
		},
		"/eventos": {
			get: {
				tags: ["Eventos"],
				summary:
					"Lista de eventos ocorridos ou previstos nos diversos órgãos da Câmara",
				description:
					"Retorna uma lista cujos elementos trazem informações básicas sobre eventos dos órgãos legislativos da Câmara, previstos ou já ocorridos, em um certo intervalo de tempo.\n\nEsse intervalo pode ser configurado pelos parâmetros de data e hora listados abaixo. Se nenhum for passado, são listados eventos dos cinco dias anteriores, dos cinco dias seguintes e do próprio dia em que é feita a requisição.",
				operationId: "getEventosUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Identificador(es) numérico(s) de um ou mais eventos, separados por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "codTipoEvento",
						in: "query",
						description:
							"Um ou mais identificador(es) numérico(s) do(s) tipo(s) de evento que se deseja obter. Os valores válidos podem ser obtidos por uma requisição a `/referencias/tiposEvento`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "codSituacao",
						in: "query",
						description:
							"Um ou mais identificador(es) numéricos de tipo(s) de situação de evento, separados por vírgula. Valores válidos podem ser obtidos em `/referencias/situacoesEvento`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "codTipoOrgao",
						in: "query",
						description:
							"Um ou mais identificador(es) numérico(s) de tipo(s) de órgão(s) realizadores dos eventos que se deseja obter, separados por vírgula. Os valores válidos podem ser obtidos em `/referencias/tiposOrgao`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "idOrgao",
						in: "query",
						description:
							"Um ou mais identificador(es) numérico(s) de órgão(s), separados por vírgula. Os identificadores podem ser obtidos em uma requisição a `/orgaos`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "horaInicio",
						in: "query",
						description:
							"Hora inicial de um intervalo de tempo, no formato `hh:mm`, em horário de Brasília.",
						required: false,
						type: "string",
					},
					{
						name: "horaFim",
						in: "query",
						description:
							"Hora final de um intervalo de tempo, no formato `hh:mm`, em horário de Brasília.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista deve ser ordenada: `id`, `dataHoraInicio`, `dataHoraFim`, `descricaoSituacao`, `descricaoTipo` ou `titulo`",
						required: false,
						type: "string",
						default: "dataHoraInicio",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Eventos",
							},
						},
					},
				},
			},
		},
		"/eventos/{id}": {
			get: {
				tags: ["Eventos"],
				summary: "Informações detalhadas sobre um evento específico",
				description:
					"Retorna um conjunto detalhado de informações sobre o evento da Câmara identificado por `id`.",
				operationId: "getEventosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description:
							"O identificador numérico do evento do qual se deseja informações",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoEventosID",
						},
					},
				},
			},
		},
		"/eventos/{id}/deputados": {
			get: {
				tags: ["Eventos"],
				summary: "Os deputados participantes de um evento específico",
				description:
					"Retorna uma lista de dados resumidos sobre deputados participantes do evento identificado por `{id}`.\nSe o evento já ocorreu, a lista identifica os deputados que efetivamente registraram presença no evento. Se o evento ainda não ocorreu, a lista mostra os deputados que _devem_ participar do evento, por serem convidados ou por serem membros do(s) órgão(s) responsável pelo evento.",
				operationId: "getEventosDeputadosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico da entidade.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoEventosDeputado",
						},
					},
				},
			},
		},
		"/eventos/{id}/orgaos": {
			get: {
				tags: ["Eventos"],
				summary: "Lista de órgãos organizadores do evento `{id}`",
				description:
					"Retorna uma lista em que cada item é um conjunto mínimo de dados sobre o(s) órgão(s) responsável(veis) pelo evento identificado por `{id}`. Atualmente, mas _provisoriamente_, esta informação já vem incorporada ao retorno de `/eventos/{id}`, mas este _endpoint_ facilita a importação destes dados em planilhas eletrônicas.",
				operationId: "obterOrgaosDoEventoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico da entidade.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoEventoOrgao",
						},
					},
				},
			},
		},
		"/eventos/{id}/pauta": {
			get: {
				tags: ["Eventos"],
				summary:
					"Lista de proposições que foram ou deverão ser avaliadas em um evento de caráter deliberativo",
				description:
					"Se o evento `{id}` for de caráter deliberativo (uma reunião ordinária, por exemplo) este serviço retorna a lista de proposições previstas para avaliação pelos parlamentares. Cada item identifica, se as informações estiverem disponíveis, a proposição avaliada, o regime de preferência para avaliação, o relator e seu parecer, o resultado da apreciação e a votação realizada.",
				operationId: "getEventosPautaUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico da entidade.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoEventosPauta",
						},
					},
				},
			},
		},
		"/eventos/{id}/votacoes": {
			get: {
				tags: ["Eventos"],
				summary:
					"Informações detalhadas de votações sobre um evento específico",
				description:
					"Retorna uma lista de dados básicos sobre votações que tenham sido realizadas no evento identificado por `{id}`. Votações só ocorrem em eventos de caráter deliberativo. Dados complementares sobre cada votação listada podem ser obtidos no recurso `/votacoes/{id}`.\n\nPara compreender melhor os dados sobre votações, veja [a página de tutorial do Portal de Dados Abertos](https://dadosabertos.camara.leg.br/howtouse/2020-02-07-dados-votacoes.html).",
				operationId: "obterVotacoesPorEventoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description:
							"O identificador numérico do evento do qual se deseja informações",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoVotacoes",
						},
					},
				},
			},
		},
		"/frentes": {
			get: {
				tags: ["Frentes"],
				summary: "Lista de frentes parlamentares de uma ou mais legislaturas",
				description:
					"Retorna uma lista de informações sobre uma frente parlamentar - um agrupamento oficial de parlamentares em torno de um determinado tema ou proposta.\n\nAs frentes existem até o fim da legislatura em que foram criadas, e podem ser recriadas a cada legislatura. Algumas delas são compostas por deputados e senadores.\n\nUm ou mais número de legislatura(s) pode(m) ser passado(s) como parâmetro, mas se for omitido são retornadas todas as frentes parlamentares criadas desde 2003.",
				operationId: "buscarUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número da(s) legislatura(s), separados por vírgulas, às quais os dados buscados devem corresponder.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Frente",
						},
					},
				},
			},
		},
		"/frentes/{id}": {
			get: {
				tags: ["Frentes"],
				summary: "Informações detalhadas sobre uma frente parlamentar",
				description:
					"Este recurso traz informações detalhadas sobre a frente parlamentar identificada por `{id}`.",
				operationId: "obterDeputadoIDUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico da frente parlamentar.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/FrenteID",
						},
					},
				},
			},
		},
		"/frentes/{id}/membros": {
			get: {
				tags: ["Frentes"],
				summary: "Os deputados que participam de uma frente parlamentar",
				description:
					"Uma lista dos deputados participantes da frente parlamentar identificada por `{id}` e os papéis que exerceram nessa frente (signatário, coordenador ou presidente).\n\nObserve que, mesmo no caso de frentes parlamentares mistas (compostas por deputados e senadores), são retornados apenas dados sobre os deputados.",
				operationId: "obterMembroUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "O identificador numérico da entidade.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/MembroFrente",
						},
					},
				},
			},
		},
		"/grupos": {
			get: {
				tags: ["Grupos"],
				summary:
					"Os grupos de cooperação entre parlamentares brasileiros e de outros países",
				description:
					"Este endpoint retorna uma lista em que cada item representa um dos grupos interparlamentares em que a Câmara teve representantes. As informações incluem nome, a resolução que criou o grupo e seu ano de publicação, e as mais recentes informações sobre situação, presidente e ofício de instalação.",
				operationId: "gruposUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada: `id`, `idLegislatura`.",
						required: false,
						type: "string",
						default: "id",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/ResultadoBloco",
							},
						},
					},
				},
			},
		},
		"/grupos/{id}": {
			get: {
				tags: ["Grupos"],
				summary:
					"Informações detalhadas sobre um determinado grupo interparlamentar",
				description:
					"Todo o conjunto de informações disponíveis sobre o grupo parlamentar identificado por `{id}`. Além dos retornados por `/grupos`, há dados sobre o projeto de resolução que levou à criação do grupo, identificadores do mais recente documento e/ou ofício de instalação do grupo, datas de sua apresentação e de sua publicação, e identificação do autor do ofício.",
				operationId: "obterGruposIDUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Número identificador do Grupo.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoGruposID",
						},
					},
				},
			},
		},
		"/grupos/{id}/historico": {
			get: {
				tags: ["Grupos"],
				summary:
					"As variações de estado que um grupo parlamentar teve ao longo do tempo",
				description:
					'Uma lista contendo todos os "retratos" das informações sujeitas a mudanças sobre o grupo parlamentar identificado por `{id}` &mdash; por exemplo, todos os ofícios de instalação dos grupos apresentados a cada legislatura desde sua criação, e eventuais substituições de presidentes.',
				operationId: "historicoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico de Grupo histórico.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/ResultadoGruposHistorico",
							},
						},
					},
				},
			},
		},
		"/grupos/{id}/membros": {
			get: {
				tags: ["Grupos"],
				summary:
					"Lista de parlamentares integrantes de um grupo interparlamentar",
				description:
					"Retorna uma lista de deputados ou senadores que são ou foram participantes do grupo interparlamentar identificado por `{id}`. Podem ser utilizados os parâmetros `dataInicio` e/ou `dataFim` para definir de qual período se deseja saber quem foram os participantes.\n\nSe nenhum parâmetro de tempo for utilizado, são retornados os integrantes registrados no momento da requisição (inclusive deputados e senadores que podem não estar em exercício). A lista será vazia se o grupo `{id}` ainda não tiver sido instalado na legislatura atual.",
				operationId: "membrosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Número(s) identificador(es) de um Membro.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada: `idLegislatura`.",
						required: false,
						type: "string",
						default: "idLegislatura",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/ResultadoGruposMembros",
							},
						},
					},
				},
			},
		},
		"/legislaturas": {
			get: {
				tags: ["Legislaturas"],
				summary: "Os períodos de mandatos e atividades parlamentares da Câmara",
				description:
					"Legislatura é o nome dado ao período de trabalhos parlamentares entre uma eleição e outra.\n\nEste serviço retorna uma lista em que cada item contém as informações básicas sobre um desses períodos.\n\nOs números que identificam as legislaturas são sequenciais, desde a primeira que ocorreu.",
				operationId: "getLegislaturaUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Um ou mais número(s) de legislatura(s), separados por vírgulas. Se omitido, serão retornados dados sobre todas as legislaturas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "data",
						in: "query",
						description:
							"Uma ou mais data(s) no formato `AAAA-MM-DD`, separadas por vírgulas. Se este parâmetro estiver presente, a requisição retornará as informações básicas sobre as legislaturas que estavam em curso nas datas informadas.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "DESC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Qual dos elementos da representação deverá ser usado para aplicar ordenação à lista.",
						required: false,
						type: "string",
						default: "id",
					},
				],
				responses: {
					"200": {
						description:
							"Uma lista de representações __legislatura___, em ordem cronológica, com a mais recente primeiro. ",
						schema: {
							$ref: "#/definitions/Legislatura",
						},
					},
				},
			},
		},
		"/legislaturas/{id}": {
			get: {
				tags: ["Legislaturas"],
				summary:
					"Informações extras sobre uma determinada legislatura da Câmara",
				description:
					"Retorna informações adicionais sobre o período de atividades da Câmara identificado por `{id}`. ",
				operationId: "obterPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Número da legislatura da qual se quer os dados.",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description:
							"Uma unidade de dados do tipo __legislatura__ com os dados sobre o período. ",
						schema: {
							$ref: "#/definitions/Legislatura",
						},
					},
				},
			},
		},
		"/legislaturas/{id}/lideres": {
			get: {
				tags: ["Deputados", "Legislaturas", "lideres"],
				summary:
					"Lista de líderes, vice-líderes e representantes na legislatura",
				description:
					"Retorna uma lista de parlamentares que ocuparam cargos de liderança ao longo da legislatura `{id}`. Cada item identifica um parlamentar, uma bancada (partido, bloco ou lideranças de situação e oposição), o título de liderança exercido e o período de exercício do parlamentar nesta posição.",
				operationId: "obterLideresUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Número da legislatura da qual se deseja os dados.",
						required: true,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de elementos. ",
						schema: {
							$ref: "#/definitions/LegislaturaIDLideres",
						},
					},
				},
			},
		},
		"/legislaturas/{id}/mesa": {
			get: {
				tags: ["Deputados", "Legislaturas"],
				summary:
					"Quais deputados fizeram parte da Mesa Diretora em uma legislatura",
				description:
					"Retorna uma lista com dados básicos sobre todos os deputados que ocuparam algum posto na Mesa Diretora da Câmara em algum período de tempo dentro da legislatura identificada por `{id}`.\n\nNormalmente, cada legislatura tem duas Mesas Diretoras, com presidente, dois vice-presidentes, quatro secretários parlamentares e os suplentes dos secretários.",
				operationId: "obterMesaPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Número da legislatura da qual se deseja os dados.",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Dia de início do intervalo de tempo do qual se deseja saber a composição da Mesa, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término do intervalo de tempo do qual se deseja saber a composição da Mesa, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de elementos __papelParlamentarPeriodo__. ",
						schema: {
							$ref: "#/definitions/LegislaturaIDMesa",
						},
					},
				},
			},
		},
		"/orgaos": {
			get: {
				tags: ["Órgãos"],
				summary: "A lista das comissões e outros órgãos legislativos da Câmara",
				description:
					"Retorna uma lista de informações básicas sobre os órgãos legislativos e seus identificadores, tipos e descrições.\n\nPela query string é possível filtrar a lista por identificadores, tipos de órgãos, sigla, situação do órgão ou período de tempo em que os órgãos estiveram ativos, se aplicável.",
				operationId: "listarUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Um ou mais identificador(es) numérico(s), separados por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "sigla",
						in: "query",
						description:
							"Uma ou mais sigla(s) oficialmente usadas para designar um ou mais órgão(s) da Câmara, separadas por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "codTipoOrgao",
						in: "query",
						description:
							"Um ou mais identificador(es) numérico(s) do(s) tipo(s) de órgãos que se deseja buscar dados. Pode(m) ser obtido(s) em `/referencias/orgaos/codTipoOrgao`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início, no formato `AAAA-MM-DD`, de um intervalo de tempo no qual os órgãos buscados devem ter estado em atividade.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término, no formato `AAAA-MM-DD`, de um intervalo de tempo no qual os órgãos buscados devem ter estado em atividade.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada: `id`, `sigla`, `nome`, `apelido`, `codTipoOrgao`, `tipoOrgao`, `dataInicio` ou `dataFim`",
						required: false,
						type: "string",
						default: "id",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Orgao",
							},
						},
					},
				},
			},
		},
		"/orgaos/{id}": {
			get: {
				tags: ["Órgãos"],
				summary: "Informações detalhadas sobre um órgão da Câmara",
				description:
					"Retorna todas as informações disponíveis sobre o órgão da Câmara identificado por `id`.",
				operationId: "getOrgaoDetalheUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico do órgão",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/OrgaoDetalhe",
						},
					},
				},
			},
		},
		"/orgaos/{id}/eventos": {
			get: {
				tags: ["Órgãos"],
				summary: "Os eventos ocorridos ou previstos em um órgão legislativo",
				description:
					"Retorna uma lista de informações resumidas dos eventos realizados (ou a realizar) pelo órgão legislativo identificado por `{id}`.\nPor padrão, são retornados eventos em andamento ou previstos para o mesmo dia, dois dias antes e dois dias depois da requisição. Parâmetros podem ser passados para alterar esse período, bem como os tipos de eventos.",
				operationId: "getOrgaoEventosDetalheUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico do órgão",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "idTipoEvento",
						in: "query",
						description:
							"Um ou mais identificador(es) numérico(s) de tipos de evento que se deseja obter. os valores válidos podem ser obtidos por uma requisição anterior a `/referencias/tiposEvento`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Qual dos elementos da representação deverá ser usado para aplicar ordenação à lista.",
						required: false,
						type: "string",
						default: "dataHoraInicio",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Eventos",
						},
					},
				},
			},
		},
		"/orgaos/{id}/membros": {
			get: {
				tags: ["Órgãos"],
				summary: "Lista de cargos de um órgão e parlamentares que os ocupam.",
				description:
					"Retorna uma lista de dados resumidos que identificam cada parlamentar e o cargo ou posição que ocupa ou ocupou no órgão parlamentar identificado por `{id}` durante um certo período de tempo.\nSe não forem passados parâmetros que delimitem esse período, o serviço retorna os membros do órgão no momento da requisição. Se o órgão não existir mais ou não estiver instalado, é retornada uma lista vazia.",
				operationId: "getOrgaoMembrosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico do órgão",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato AAAA-MM-DD.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato AAAA-MM-DD.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/OrgaoMembros",
						},
					},
				},
			},
		},
		"/orgaos/{id}/votacoes": {
			get: {
				tags: ["Órgãos"],
				summary: "Informações detalhadas sobre votações de um órgão da Câmara",
				description:
					"Retorna uma lista de dados básicos de votações que tenham sido realizadas em eventos realizados no órgão `{id}`.\n\nSe `{id}` for um órgão permanente da Câmara, são retornados, por padrão, dados sobre as votações realizadas pelo órgão nos últimos 30 dias. Esse período pode ser alterado com o uso dos parâmetros `dataInicio` e/ou `dataFim`, que por enquanto são limitados a selecionar somente votações ocorridas em um mesmo ano.\n\nCaso `{id}` seja um órgão temporário, como uma comissão especial, são listadas por padrão todas as votações ocorridas no órgão, em qualquer período de tempo.\n\nDados complementares sobre cada votação listada podem ser obtidos no recurso `/votacoes/{id}`.\n\nPara compreender melhor os dados sobre votações, veja [a página de tutorial do Portal de Dados Abertos](https://dadosabertos.camara.leg.br/howtouse/2020-02-07-dados-votacoes.html).",
				operationId: "getVotacoesPorOrgaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico do órgão",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "idProposicao",
						in: "query",
						description:
							"Um ou mais identificador(es) numéricos de proposições, que podem ser obtidos por meio do recurso `/proposicoes`. Se presente, listará as votações que tiveram a(s) proposição(ções) como objeto de votação ou que afetaram as proposições listadas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data em formato `AAAA-MM-DD` para início do intervalo de tempo no qual tenham sido realizadas as votações a serem listadas. Se usado sozinho, esse parâmetro faz com que sejam retornadas votações ocorridas dessa data até o fim do mesmo ano. Se usado com `dataFim`, as duas datas devem ser de um mesmo ano.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data em formato `AAAA-MM-DD` que define o fim do intervalo de tempo no qual tenham sido realizadas as votações a serem listadas. Se usado sozinho, esse parâmetro faz com que sejam retornadas todas as votações ocorridas desde 1º de janeiro do mesmo ano até esta data. Se usado com `dataInicio`, é preciso que as duas datas sejam de um mesmo ano.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição. O valor padrão e máximo para este endpoint é 200, e valores maiores serão ignorados.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "DESC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada. Pode ser `id`, `idOrgao`, `siglaOrgao`, `idEvento`, `idProposicao`, `data`, `dataHoraRegistro` ou `idProposicaoObjeto`.",
						required: false,
						type: "string",
						default: "dataHoraRegistro",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Votacao",
						},
					},
				},
			},
		},
		"/partidos": {
			get: {
				tags: ["Partidos"],
				summary:
					"Os partidos políticos que têm ou já tiveram parlamentares em exercício na Câmara",
				description:
					"Retorna uma lista de dados básicos sobre os partidos políticos que têm ou já tiveram deputados na Câmara.\nSe não forem passados parâmetros, o serviço retorna os partidos que têm deputados em exercício no momento da requisição.\n\nÉ possível obter uma lista de partidos representados na Câmara em um certo intervalo de datas ou de legislaturas. Se um intervalo e uma ou mais legislatura(s) não coincidentes forem passados, todos os intervalos de tempo serão somados.\n\nTambém se pode fazer busca por uma ou mais sigla(s), mas atenção: em diferentes legislaturas, pode haver mais de um partido usando a mesma sigla.",
				operationId: "listarPartidosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "sigla",
						in: "query",
						description:
							"Sigla de um ou mais partido(s), separadas por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número da(s) legislatura(s), separados por vírgulas, às quais os dados buscados devem corresponder.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista deve ser ordenada: `id`, `sigla`, `nome`, `dataInicio` ou `dataFim`",
						required: false,
						type: "string",
						default: "sigla",
					},
				],
				responses: {
					"200": {
						description:
							"Uma lista de representações resumidas __partido___, com as informações básicas sobre cada partido.",
						schema: {
							$ref: "#/definitions/Partido_",
						},
					},
				},
			},
		},
		"/partidos/{id}": {
			get: {
				tags: ["Partidos"],
				summary: "Informações detalhadas sobre um partido",
				operationId: "getPartidoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Id do Partido",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoPartidosID",
						},
					},
				},
			},
		},
		"/partidos/{id}/lideres": {
			get: {
				tags: ["Partidos", "lideres"],
				summary:
					"Deputados que são ou foram líderes ou vice-líderes de um partido",
				description:
					"Retorna uma lista de deputados que ocupam ou ocuparam cargos de líder ou vice-líder do partido {id} num intervalo de tempo opcional, com a identificação do cargo e o período em que o tiveram.",
				operationId: "obterLideresUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "ID do partido do qual se deseja os dados.",
						required: true,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
				],
				responses: {
					"200": {
						description: "Uma lista de elementos. ",
						schema: {
							$ref: "#/definitions/PartidosIDLideres",
						},
					},
				},
			},
		},
		"/partidos/{id}/membros": {
			get: {
				tags: ["Partidos"],
				summary: "Uma lista dos parlamentares de um partido durante um período",
				description:
					"Retorna uma lista de deputados que estão ou estiveram em exercício pelo partido `{id}`.\n\nOpcionalmente, pode-se usar os parâmetros `dataInicio`, `dataFim` ou `idLegislatura` para se obter uma lista de deputados filiados ao partido num certo intervalo de tempo. Isso é equivalente ao serviço `/deputados` com filtro por partido, mas é melhor para obter informações sobre membros de partidos já extintos.",
				operationId: "getMembrosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Id do Partido",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data de início de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data de término de um intervalo de tempo, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "idLegislatura",
						in: "query",
						description:
							"Número da(s) legislatura(s), separados por vírgulas, às quais os dados buscados devem corresponder.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada: `id`, `nome`, `siglaUf`",
						required: false,
						type: "string",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoPartidosIDMembros",
						},
					},
				},
			},
		},
		"/proposicoes": {
			get: {
				tags: ["Proposições"],
				summary: "Lista configurável de proposições na Câmara",
				description:
					"Lista de informações básicas sobre projetos de lei, resoluções, medidas provisórias, emendas, pareceres e todos os outros tipos de proposições na Câmara.\n\nPor padrão, são retornadas todas as proposições que foram apresentadas ou tiveram alguma mudança de situação nos últimos 30 dias. Esse intervalo de tramitação pode ser configurado pelos parâmetros `dataInicio` e `dataFim`.\n\nSe for(em) passado(s) um ou mais dos parâmetros...\n\n  - `id`\n\n  - `ano`\n\n  - `dataApresentacaoInicio`\n\n  - `dataApresentacaoFim`\n\n  - `idAutor`\n\n  - `autor`\n\n...o intervalo de tramitação só será levado em consideração se os parâmetros `dataInicio` e/ou `dataFim` estiverem explicitamente configurados. Se não estiverem, poderão ser listadas proposições que não tiveram tramitação recente (e a resposta pode demorar bastante).",
				operationId: "searchUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Número(s) identificador(es) de uma ou mais proposições no **Dados Abertos**, separados por vírgulas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "siglaTipo",
						in: "query",
						description:
							"Uma ou mais sigla(s) separadas por vírgulas do(s) tipo(s) das proposições que se deseja obter. A lista de tipos e siglas existentes pode ser obtida em `/referencias/proposicoes/siglaTipo`",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "numero",
						in: "query",
						description:
							'Um ou mais número(s), separados por vírgula, oficialmente atribuídos às proposições segundo o art. 137 do Regimento Interno, como "PL **1234**/2016"',
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "ano",
						in: "query",
						description:
							"Um ou mais ano(s) de apresentação das proposições que serão listadas, separados por vírgulas, no formato `AAAA`",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "idDeputadoAutor",
						in: "query",
						description:
							"Um ou mais números identificador(es), separados por vírgula, do(s) deputado(s) autor(es) das proposições que serão listadas. Cada número deve ser o identificador exclusivo de um parlamentar no **Dados Abertos**",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "autor",
						in: "query",
						description:
							"Nome ou parte do nome do(s) autor(es) das proposições que se deseja obter. Deve estar entre aspas",
						required: false,
						type: "string",
					},
					{
						name: "siglaPartidoAutor",
						in: "query",
						description:
							"Uma ou mais sigla(s) separadas por vírgulas do(s) partido(s) a que pertençam os autores das proposições a serem listadas",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "idPartidoAutor",
						in: "query",
						description:
							"Identificador numérico no **Dados Abertos** do partido a que pertençam os autores das proposições que serão listadas. Esses identificadores podem ser obtidos em `/partidos` e são mais precisos do que as siglas, que podem ser usadas por partidos diferentes em épocas diferentes",
						required: false,
						type: "integer",
						format: "int64",
					},
					{
						name: "siglaUfAutor",
						in: "query",
						description:
							"Uma ou mais sigla(s) de unidade(s) da federação (estados e Distrito Federal) pela(s) qual(quais) o(s) autor(es) das proposições selecionadas tenha(m) sido eleito(s)",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "keywords",
						in: "query",
						description:
							"Uma ou mais palavras chaves sobre o tema a que a proposição se relaciona",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "tramitacaoSenado",
						in: "query",
						description:
							"Indicador booleano, com valor `TRUE` ou `FALSE` para trazer apenas proposições que já tenha tramitado no Senado",
						required: false,
						type: "boolean",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data do início do intervalo de tempo em que tenha havido tramitação das proposições a serem listadas, no formato `AAAA-MM-DD`. Se omitido, é assumido como a data de 30 dias anteriores à proposição",
						required: false,
						type: "string",
						format: "date-time",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data do fim do intervalo de tempo em que tenha havido tramitação das proposições a serem listadas. Se omitido, é considerado ser o dia em que é feita a requisição",
						required: false,
						type: "string",
						format: "date-time",
					},
					{
						name: "dataApresentacaoInicio",
						in: "query",
						description:
							"Data do início do intervalo de tempo em que tenham sido apresentadas as proposições a serem listadas, no formato `AAAA-MM-DD`",
						required: false,
						type: "string",
						format: "date-time",
					},
					{
						name: "dataApresentacaoFim",
						in: "query",
						description:
							"Data do fim do intervalo de tempo em que tenham sido apresentadas as proposições a serem listadas",
						required: false,
						type: "string",
						format: "date-time",
					},
					{
						name: "codSituacao",
						in: "query",
						description:
							"Código(s) numérico(s), separados por vírgulas, do tipo de situação em que se encontram as proposições que serão listadas. As situações possíveis podem ser obtidas em `/referencias/proposicoes/codSituacao`. **Atenção:** este parâmetro pode apresentar resultados inesperados, por problemas com o registro dos dados.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "codTema",
						in: "query",
						description:
							"Código(s) numérico(s), separados por vírgulas, das áreas temáticas das proposições que serão listadas. Os temas possíveis podem ser obtidos em `/referencias/proposicoes/codTema`",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "ASC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista deve ser ordenada: `id`, `codTipo`, `siglaTipo`, `numero` ou `ano`",
						required: false,
						type: "string",
						default: "id",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ProposicaoGeral",
						},
					},
				},
			},
		},
		"/proposicoes/{id}": {
			get: {
				tags: ["Proposições"],
				summary: "Informações detalhadas sobre uma proposição específica",
				operationId: "obterPorIdUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico da proposição",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "object",
						},
					},
				},
			},
		},
		"/proposicoes/{id}/autores": {
			get: {
				tags: ["Proposições"],
				summary: "Lista pessoas e/ou entidades autoras de uma proposição",
				description:
					"Retorna uma lista em que cada item identifica uma pessoa ou entidade que é autora da proposição identificada por `{id}`. Além de deputados, também podem ser autores de proposições os senadores, a sociedade civil, assembleias legislativas e os poderes Executivo e Judiciário.\n\nPelo Regimento da Câmara, todos os que assinam uma proposição são considerados autores (art. 102), tanto os proponentes quanto os apoiadores.\n\nPara obter mais informações sobre cada autor, é recomendável acessar, se disponível, a URL que é valor do campo `uri`.",
				operationId: "obterAutoresDaProposicaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador alfanumérico da entidade",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoProposicoesAutores",
						},
					},
				},
			},
		},
		"/proposicoes/{id}/relacionadas": {
			get: {
				tags: ["Proposições"],
				summary: "Uma lista de proposições relacionadas a uma em especial",
				description:
					"Lista de informações básicas sobre proposições que de alguma forma se relacionam com a proposição identificada por `{id}`, como pareceres, requerimentos, substitutivos, etc.\n\n",
				operationId: "obterRelacionadasPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Id da proposição",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoProposicoesRelacionadas",
						},
					},
				},
			},
		},
		"/proposicoes/{id}/temas": {
			get: {
				tags: ["Proposições"],
				summary: "Lista de áreas temáticas de uma proposição",
				description:
					"Lista em que cada item traz informações sobre uma área temática à qual a proposição identificada por `{id}` se relaciona, segundo classificação oficial do Centro de Documentação e Informação da Câmara.",
				operationId: "obterTemasPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Id da proposição",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoProposicoesTema",
						},
					},
				},
			},
		},
		"/proposicoes/{id}/tramitacoes": {
			get: {
				tags: ["Proposições"],
				summary: "O histórico de passos na tramitação de uma proposta",
				description:
					'Lista que traz, como cada item, um "retrato" de informações que podem ser alteradas a cada etapa de tramitação na vida de uma proposição (como regime de tramitação e situação) e informações sobre o que causou esse novo estado.\n\nEsta representação das tramitações ainda é provisória.',
				operationId: "obterTramitacaoPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador numérico da proposição",
						required: true,
						type: "integer",
						format: "int64",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data do início da tramitação, no formato `AAAA-MM-DD`.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description: "Data do fim da tramitação",
						required: false,
						type: "string",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoProposicoesTramitacao",
						},
					},
				},
			},
		},
		"/proposicoes/{id}/votacoes": {
			get: {
				tags: ["Proposições"],
				summary:
					"Informações detalhadas de votações sobre uma proposição específica",
				description:
					"Retorna uma lista de identificadores básicos sobre as votações na Câmara que tiveram a proposição `{id}` como _objeto_ ou como _afetada_ pelos seus resultados. Dados complementares sobre cada votação listada podem ser obtidos no recurso `/votacoes/{id}`.\n\nPara compreender melhor os dados sobre votações, veja [a página de tutorial do Portal de Dados Abertos](https://dadosabertos.camara.leg.br/howtouse/2020-02-07-dados-votacoes.html).",
				operationId: "obterVotacoesPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "DESC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada: `id`, `dataHoraRegistro`",
						required: false,
						type: "string",
						default: "dataHoraRegistro",
					},
					{
						name: "id",
						in: "path",
						description: "Identificador numérico da proposição",
						required: true,
						type: "integer",
						format: "int64",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ResultadoVotacoes",
						},
					},
				},
			},
		},
		"/referencias/deputados": {
			get: {
				tags: ["Referências"],
				summary: "Valores válidos para parâmetros do endpoint `/deputados`",
				description:
					'Retorna, como valor do elemento "dados", um objeto em que cada elemento tem o nome de um parâmetro aplicável ao endpoint /deputados. Cada elemento desses tem como valor uma lista de itens (nós em XML) em que cada item representa um valor válido que pode ser atribuído ao parâmetro.\nEm outras palavras: uma requisição a esta URL tem como resposta uma versão agregada das respostas de todas as URLs abaixo dela. Assim, em uma só chamada é possível obter uma lista de todos os parâmetros que exigem valores predeterminados, e quais são os valores válidos para tais parâmetros.\nEste recurso não é disponível em formato CSV.',
				operationId: "getDeputadosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ReferenciaDeputado",
						},
					},
				},
			},
		},
		"/referencias/deputados/codSituacao": {
			get: {
				tags: ["Deputados", "Referências"],
				summary:
					"As possíveis situações de exercício parlamentar de um deputado",
				description:
					"Retorna uma lista de siglas e descrições dos possíveis estados em que um deputado pode estar em relação ao seu exercício parlamentar: `Exercício`, `Fim de Mandato`, `Afastado`, etc.",
				operationId: "getSituacoesDeputadoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/deputados/codTipoProfissao": {
			get: {
				tags: ["Referências"],
				summary:
					"Códigos e títulos de atividades profissionais usados na Câmara",
				description:
					"Retorna uma lista dos títulos de profissões registradas na Câmara dos Deputados (em masculino) e seus códigos.",
				operationId: "getCodTipoProfissaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/deputados/siglaUF": {
			get: {
				tags: ["Referências"],
				summary: "As siglas e nomes dos estados e do Distrito Federal",
				description:
					"Retorna uma lista de siglas e nomes das unidades de federação brasileiras, usados principalmente para indicar onde um parlamentar foi eleito.",
				operationId: "getUfUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/deputados/tipoDespesa": {
			get: {
				tags: ["Referências"],
				summary:
					"Os possíveis tipos de despesas que fazem parte da Cota Parlamentar",
				description:
					"Retorna uma lista de códigos e nomes das possíveis despesas de Cota Parlamentar: `COMBUSTÍVEIS E LUBRIFICANTES.`, `TELEFONIA`, `SERVIÇOS POSTAIS`, etc.",
				operationId: "getDespesasUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/eventos": {
			get: {
				tags: ["Referências"],
				summary: "Valores válidos para parâmetros do endpoint `/eventos`",
				description:
					'Retorna, como valor do elemento "dados", um objeto em que cada elemento tem o nome de um parâmetro aplicável ao endpoint /eventos. Cada elemento desses tem como valor uma lista de itens (nós em XML) em que cada item representa um valor válido que pode ser atribuído ao parâmetro.\nEm outras palavras: uma requisição a esta URL tem como resposta uma versão agregada das respostas de todas as URLs abaixo dela. Assim, em uma só chamada é possível obter uma lista de todos os parâmetros que exigem valores predeterminados, e quais são os tais valores para cada um desses parâmetros.\nEste recurso não é disponível em formato CSV.',
				operationId: "getEentosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ReferenciaEvento",
						},
					},
				},
			},
		},
		"/referencias/eventos/codSituacaoEvento": {
			get: {
				tags: ["Eventos", "Referências"],
				summary: "As possíveis situações para eventos",
				description:
					"Retorna uma lista de identificadores numéricos, siglas e descrições dos estados em que eventos como uma reunião podem se encontrar, como `Em Andamento`, `Cancelada` e `Encerrada`.",
				operationId: "getSituacoesEventoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/eventos/codTipoEvento": {
			get: {
				tags: ["Eventos", "Referências"],
				summary: "Os tipos de eventos realizados na Câmara",
				description:
					"Retorna uma lista de identificadores numéricos, siglas e descrições dos tipos de eventos ocorridos na Câmara, tais como `Audiência Pública`, `Comissão Geral` e `Palestra`, entre outros.",
				operationId: "getTiposEventoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/orgaos": {
			get: {
				tags: ["Referências"],
				summary: "Valores válidos para parâmetros do endpoint sobre órgãos",
				description:
					'Retorna, como valor do elemento "dados", um objeto em que cada elemento tem o nome de um parâmetro aplicável ao endpoint /orgaos. Cada elemento desses tem como valor uma lista de itens (nós em XML) em que cada item representa um valor válido que pode ser atribuído ao parâmetro.\nEm outras palavras: uma requisição a esta URL tem como resposta uma versão agregada das respostas de todas as URLs abaixo dela. Assim, em uma só chamada é possível obter uma lista de todos os parâmetros que exigem valores predeterminados, e quais são os tais valores para cada um desses parâmetros.\nEste recurso não é disponível em formato CSV.',
				operationId: "getOrgaosUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ReferenciaOrgao",
						},
					},
				},
			},
		},
		"/referencias/orgaos/codSituacao": {
			get: {
				tags: ["Referências", "Órgãos"],
				summary: "As situações em que órgãos podem se encontrar",
				description:
					"Retorna uma lista de identificadores numéricos, títulos e descrições das situações possíveis para órgãos em operação na Câmara, como `Em funcionamento`, `Extinta`, `Pronta para criação`, etc.",
				operationId: "getSituacoesOrgaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/orgaos/codTipoOrgao": {
			get: {
				tags: ["Referências"],
				summary: "Os tipos de órgãos que existem na Câmara",
				description:
					"Retorna uma lista de identificadores numéricos, siglas e descrições dos tipos de órgãos legislativos ou representados na Câmara, tais como as comissões permanentes, CPIs, procuradorias, etc.",
				operationId: "getTiposOrgaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Referencia",
						},
					},
				},
			},
		},
		"/referencias/proposicoes": {
			get: {
				tags: ["Referências"],
				summary: "Valores válidos para parâmetros do endpoint sobre órgãos",
				description:
					'Retorna, como valor do elemento "dados", um objeto em que cada elemento tem o nome de um parâmetro aplicável ao endpoint /proposicoes. Cada elemento desses tem como valor uma lista de itens (nós em XML) em que cada item representa um valor válido que pode ser atribuído ao parâmetro.\nEm outras palavras: uma requisição a esta URL tem como resposta uma versão agregada das respostas de todas as URLs abaixo dela. Assim, em uma só chamada é possível obter uma lista de todos os parâmetros que exigem valores predeterminados, e quais são os tais valores para cada um desses parâmetros.\nEste recurso não é disponível em formato CSV.',
				operationId: "getProposicoesUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/ReferenciaProposicao",
						},
					},
				},
			},
		},
		"/referencias/proposicoes/codSituacao": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os possíveis estados de tramitação de uma proposição",
				description:
					"Uma lista de identificadores das diversas situações de tramitação em que uma proposição pode se encontrar, como `Encaminhada à Publicação`, `Aguardando Análise`, `Devolvida ao Autor`, etc.",
				operationId: "getSituacoesProposicaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/proposicoes/codTema": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os vários tipos de temas existentes",
				description:
					"Uma lista de identificadores numéricos e nome dos temas que uma proposição pode apresentar.",
				operationId: "getTemasProposicaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/proposicoes/codTipoAutor": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Entidades que podem ser autoras de proposições",
				description:
					"Uma lista de códigos numéricos e descritores dos tipos de parlamentares, órgãos da Câmara e instituições que podem ser autores de proposições.",
				operationId: "getTiposAutorUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/proposicoes/codTipoTramitacao": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os vários tipos de tramitação existentes",
				description:
					"Uma lista de identificadores numéricos, siglas e descrições dos tipos de tramitações em que uma proposição pode se encontrar, como `Apensação`, `Despacho`, `Devolução ao autor`, etc.",
				operationId: "getTiposTramitacaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/proposicoes/siglaTipo": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os vários tipos de proposições existentes",
				description:
					"Uma lista de identificadores numéricos, siglas e descrições dos tipos de proposições que existem ou já existiram no Congresso, tais como `PEC`, `Requerimento`, `Emenda de Plenário` e outros.",
				operationId: "getTiposProposicaoUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/situacoesDeputado": {
			get: {
				tags: ["Deputados", "Referências"],
				summary:
					"As possíveis situações de exercício parlamentar de um deputado",
				description:
					"Retorna uma lista de siglas e descrições dos possíveis estados em que um deputado pode estar em relação ao seu exercício parlamentar: `Exercício`, `Fim de Mandato`, `Afastado`, etc.",
				operationId: "getSituacoesDeputadoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/situacoesEvento": {
			get: {
				tags: ["Eventos", "Referências"],
				summary: "As possíveis situações para eventos",
				description:
					"Retorna uma lista de identificadores numéricos, siglas e descrições dos estados em que eventos como uma reunião podem se encontrar, como `Em Andamento`, `Cancelada` e `Encerrada`.",
				operationId: "getSituacoesEventoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/situacoesOrgao": {
			get: {
				tags: ["Referências", "Órgãos"],
				summary: "As situações em que órgãos podem se encontrar",
				description:
					"Retorna uma lista de identificadores numéricos, títulos e descrições das situações possíveis para órgãos em operação na Câmara, como `Em funcionamento`, `Extinta`, `Pronta para criação`, etc.",
				operationId: "getSituacoesOrgaoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/situacoesProposicao": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os possíveis estados de tramitação de uma proposição",
				description:
					"Uma lista de identificadores das diversas situações de tramitação em que uma proposição pode se encontrar, como `Encaminhada à Publicação`, `Aguardando Análise`, `Devolvida ao Autor`, etc.",
				operationId: "getSituacoesProposicaoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/tiposAutor": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Entidades que podem ser autoras de proposições",
				description:
					"Uma lista de códigos numéricos e descritores dos tipos de parlamentares, órgãos da Câmara e instituições que podem ser autores de proposições.",
				operationId: "getTiposAutorUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/tiposEvento": {
			get: {
				tags: ["Eventos", "Referências"],
				summary: "Os tipos de eventos realizados na Câmara",
				description:
					"Retorna uma lista de identificadores numéricos, siglas e descrições dos tipos de eventos ocorridos na Câmara, tais como `Audiência Pública`, `Comissão Geral` e `Palestra`, entre outros.",
				operationId: "getTiposEventoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/tiposOrgao": {
			get: {
				tags: ["Referências"],
				summary: "Os tipos de órgãos que existem na Câmara",
				description:
					"Retorna uma lista de identificadores numéricos, siglas e descrições dos tipos de órgãos legislativos ou representados na Câmara, tais como as comissões permanentes, CPIs, procuradorias, etc.",
				operationId: "getTiposOrgaoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Referencia",
						},
					},
				},
			},
		},
		"/referencias/tiposProposicao": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os vários tipos de proposições existentes",
				description:
					"Uma lista de identificadores numéricos, siglas e descrições dos tipos de proposições que existem ou já existiram no Congresso, tais como `PEC`, `Requerimento`, `Emenda de Plenário` e outros.",
				operationId: "getTiposProposicaoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/tiposTramitacao": {
			get: {
				tags: ["Proposições", "Referências"],
				summary: "Os vários tipos de tramitação existentes",
				description:
					"Uma lista de identificadores numéricos, siglas e descrições dos tipos de tramitações em que uma proposição pode se encontrar, como `Apensação`, `Despacho`, `Devolução ao autor`, etc.",
				operationId: "getTiposTramitacaoUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/referencias/uf": {
			get: {
				tags: ["Referências"],
				summary: "As siglas e nomes dos estados e do Distrito Federal",
				description:
					"Retorna uma lista de siglas e nomes das unidades de federação brasileiras, usados principalmente para indicar onde um parlamentar foi eleito.",
				operationId: "getUfUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Referencia",
							},
						},
					},
				},
			},
		},
		"/votacoes": {
			get: {
				tags: ["Votações"],
				summary: "Lista das votações da Câmara",
				description:
					"Retorna uma lista de informações básicas sobre as votações ocorridas em eventos dos diversos órgãos da Câmara.\n\nSe não forem passados parâmetros que delimitem o intervalo de tempo da pesquisa, são retornados dados sobre todas as votações ocorridas nos últimos 30 dias, em eventos de todos os órgãos.\n\nOs parâmetros de data permitem estender o período, mas por enquanto é **necessário** que as duas datas sejam de um mesmo ano. Quando apenas uma delas está presente, são retornadas somente as votações ocorridas no mesmo ano, antes de `dataFim` ou após `dataInicio`.\n\nTambém é possível filtrar a listagem por identificadores de órgãos da Câmara, de proposições e de eventos.\n\nQuando não há identificação da proposição que foi efetivamente votada, é preciso consultar o endpoint `/votacoes/{id}` para obter uma lista de proposições das quais uma pode ter sido o objeto da votação.\n\nPara mais informações sobre o uso dos endpoints de votações, veja [a página de tutorial do Portal de Dados Abertos](https://dadosabertos.camara.leg.br/howtouse/2020-02-07-dados-votacoes.html).",
				operationId: "listarUsingGET_5",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "query",
						description:
							"Um ou mais identificador(es) alfanuméricos de votação, separados por vírgulas, para que seja(m) listado(s) dados sobre uma ou mais votações específicas.",
						required: false,
						type: "array",
						items: {
							type: "string",
						},
						collectionFormat: "multi",
					},
					{
						name: "idProposicao",
						in: "query",
						description:
							"Um ou mais identificador(es) numéricos de proposições, que podem ser obtidos por meio do recurso `/proposicoes`. Se presente, listará as votações que tiveram a(s) proposição(ções) como objeto de votação ou que afetaram as proposições listadas.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "idEvento",
						in: "query",
						description:
							"Identificador de um ou mais evento(s) realizado(s) na Câmara, separados por vírgula, nos quais tenham sido realizadas as votações a serem listadas. Os identificadores podem ser obtidos por meio do recurso `/eventos`. Somente os eventos deliberativos podem ter votações. Os eventos podem ter ocorrido fora do intervalo de tempo padrão ou definido por `dataInicio` e/ou `dataFim`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "idOrgao",
						in: "query",
						description:
							"Um ou mais identificador(es) numéricos de órgãos da Câmara, separados por vírgulas. Se presente, serão retornadas somente votações dos órgãos enumerados. Os identificadores existentes podem ser obtidos por meio do recurso `/orgaos`.",
						required: false,
						type: "array",
						items: {
							type: "integer",
							format: "int64",
						},
						collectionFormat: "multi",
					},
					{
						name: "dataInicio",
						in: "query",
						description:
							"Data em formato `AAAA-MM-DD` para início do intervalo de tempo no qual tenham sido realizadas as votações a serem listadas. Se usado sozinho, esse parâmetro faz com que sejam retornadas votações ocorridas dessa data até o fim do mesmo ano. Se usado com `dataFim`, as duas datas devem ser de um mesmo ano.",
						required: false,
						type: "string",
					},
					{
						name: "dataFim",
						in: "query",
						description:
							"Data em formato `AAAA-MM-DD` que define o fim do intervalo de tempo no qual tenham sido realizadas as votações a serem listadas. Se usado sozinho, esse parâmetro faz com que sejam retornadas todas as votações ocorridas desde 1º de janeiro do mesmo ano até esta data. Se usado com `dataInicio`, é preciso que as duas datas sejam de um mesmo ano.",
						required: false,
						type: "string",
					},
					{
						name: "pagina",
						in: "query",
						description:
							"Número da página de resultados, a partir de 1, que se deseja obter com a requisição, contendo o número de itens definido pelo parâmetro itens. Se omitido, assume o valor 1.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "itens",
						in: "query",
						description:
							"Número máximo de itens na página que se deseja obter com esta requisição. O valor padrão e máximo para este endpoint é 200, e valores maiores serão ignorados.",
						required: false,
						type: "integer",
						format: "int32",
					},
					{
						name: "ordem",
						in: "query",
						description:
							"O sentido da ordenação: `asc` para A a Z ou 0 a 9, e `desc` para Z a A ou 9 a 0.",
						required: false,
						type: "string",
						default: "DESC",
					},
					{
						name: "ordenarPor",
						in: "query",
						description:
							"Nome do campo pelo qual a lista será ordenada. Pode ser `id`, `idOrgao`, `siglaOrgao`, `idEvento`, `idProposicao`, `data`, `dataHoraRegistro` ou `idProposicaoObjeto`.",
						required: false,
						type: "string",
						default: "dataHoraRegistro",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							type: "array",
							items: {
								$ref: "#/definitions/Votacao",
							},
						},
					},
				},
			},
		},
		"/votacoes/{id}": {
			get: {
				tags: ["Votações"],
				summary: "Informações detalhadas sobre uma votação da Câmara",
				description:
					"Retorna um conjunto detalhado de dados sobre a votação identificada por `{id}`, tais como as proposições que podem ter sido o objeto da votação e os efeitos de tramitação de outras proposições que eventualmente tenham sido cadastrados em consequência desta votação.\n\nPara compreender melhor os dados retornados, veja o [tutorial sobre votações do Portal de Dados Abertos](https://dadosabertos.camara.leg.br/howtouse/2020-02-07-dados-votacoes.html).",
				operationId: "getVotacaoIDUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador alfanumérico da votação",
						required: true,
						type: "string",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/VotacaoID",
						},
					},
				},
			},
		},
		"/votacoes/{id}/orientacoes": {
			get: {
				tags: ["Votações"],
				summary:
					"O voto recomendado pelas lideranças aos seus deputados em uma votação.",
				description:
					"Em muitas votações, os líderes de partidos e blocos - as _bancadas_ - fazem recomendações de voto para seus parlamentares. Essas _orientações_ de uma votação também são feitas pelas lideranças de Governo, Minoria e as mais recentes Maioria e Oposição. Uma liderança também pode _liberar a bancada_ para que cada deputado vote como quiser, ou entrar em _obstrução_, para que seus parlamentares não sejam contados para o quórum da votação.\n\nSe a votação identificada por `{id}` teve orientações, este recurso retorna uma lista em que cada item contém os identificadores de um partido, bloco ou liderança, e o posicionamento ou voto que foi recomendado aos seus parlamentares.\n\nAté o momento, só estão disponíveis dados sobre orientações dadas em votações no Plenário.",
				operationId: "getVotacaoIDOrientacoesUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador alfanumérico da votação",
						required: true,
						type: "string",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Orientacao",
						},
					},
				},
			},
		},
		"/votacoes/{id}/votos": {
			get: {
				tags: ["Votações"],
				summary: "Como cada parlamentar votou em uma votação nominal e aberta",
				description:
					'Se `{id}` é o identificador de uma votação da Câmara _nominal_ que não tenha sido _secreta_, este _endpoint_ retorna uma lista em que cada item contém os identificadores básicos de um deputado e o voto ou posicionamento que ele registrou. \n\nO resultado é uma lista vazia se `{id}` foi uma votação _simbólica_, em que os votos individuais não são contabilizados. Mas há algumas votações simbólicas que também têm registros de \\"votos\\": nesses casos, normalmente se trata de parlamentares que pediram expressamente que seus posicionamentos fossem registrados.\n\nNão são listados parlamentares ausentes à votação.',
				operationId: "getVotacaoVotosPorIdUsingGET_2",
				produces: ["application/xml", "application/json", "text/xml"],
				parameters: [
					{
						name: "id",
						in: "path",
						description: "Identificador alfanumérico da votação",
						required: true,
						type: "string",
					},
				],
				responses: {
					"200": {
						description: "OK",
						schema: {
							$ref: "#/definitions/Votos",
						},
					},
				},
			},
		},
	},
	definitions: {
		Apreciacao: {
			type: "object",
			properties: {
				descricao: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
			},
			title: "Apreciacao",
		},
		Autor: {
			type: "object",
			properties: {
				codPartido: {
					type: "integer",
					format: "int64",
				},
				ideCadastro: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				siglaPartido: {
					type: "string",
				},
				siglaUF: {
					type: "string",
				},
			},
			title: "Autor",
		},
		BancadaLideres: {
			type: "object",
			properties: {
				nome: {
					type: "string",
				},
				tipo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "BancadaLideres",
		},
		Bloco: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
				idLegislatura: {
					type: "string",
				},
				nome: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "Bloco",
		},
		BlocoID: {
			type: "object",
			properties: {
				id: {
					type: "string",
				},
				idLegislatura: {
					type: "string",
				},
				nome: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "BlocoID",
		},
		Deputado: {
			type: "object",
			properties: {
				email: {
					type: "string",
					xml: {
						name: "email",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				siglaPartido: {
					type: "string",
					xml: {
						name: "siglaPartido",
						attribute: false,
						wrapped: false,
					},
				},
				siglaUf: {
					type: "string",
					xml: {
						name: "siglaUf",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartido: {
					type: "string",
					xml: {
						name: "uriPartido",
						attribute: false,
						wrapped: false,
					},
				},
				urlFoto: {
					type: "string",
					xml: {
						name: "urlFoto",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Deputado",
		},
		DeputadoDespesas: {
			type: "object",
			properties: {
				ano: {
					type: "integer",
					format: "int64",
					xml: {
						name: "ano",
						attribute: false,
						wrapped: false,
					},
				},
				cnpjCpfFornecedor: {
					type: "string",
					xml: {
						name: "cnpjCpfFornecedor",
						attribute: false,
						wrapped: false,
					},
				},
				codDocumento: {
					type: "integer",
					format: "int64",
					xml: {
						name: "codDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				codLote: {
					type: "integer",
					format: "int64",
					xml: {
						name: "codLote",
						attribute: false,
						wrapped: false,
					},
				},
				codTipoDocumento: {
					type: "integer",
					format: "int64",
					xml: {
						name: "codTipoDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				dataDocumento: {
					type: "string",
					xml: {
						name: "dataDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				mes: {
					type: "integer",
					format: "int64",
					xml: {
						name: "mes",
						attribute: false,
						wrapped: false,
					},
				},
				nomeFornecedor: {
					type: "string",
					xml: {
						name: "nomeFornecedor",
						attribute: false,
						wrapped: false,
					},
				},
				numDocumento: {
					type: "string",
					xml: {
						name: "numDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				numRessarcimento: {
					type: "string",
					xml: {
						name: "numRessarcimento",
						attribute: false,
						wrapped: false,
					},
				},
				parcela: {
					type: "integer",
					format: "int64",
					xml: {
						name: "parcela",
						attribute: false,
						wrapped: false,
					},
				},
				tipoDespesa: {
					type: "string",
					xml: {
						name: "tipoDespesa",
						attribute: false,
						wrapped: false,
					},
				},
				tipoDocumento: {
					type: "string",
					xml: {
						name: "tipoDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				urlDocumento: {
					type: "string",
					xml: {
						name: "urlDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				valorDocumento: {
					type: "number",
					format: "double",
					xml: {
						name: "valorDocumento",
						attribute: false,
						wrapped: false,
					},
				},
				valorGlosa: {
					type: "number",
					format: "double",
					xml: {
						name: "valorGlosa",
						attribute: false,
						wrapped: false,
					},
				},
				valorLiquido: {
					type: "number",
					format: "double",
					xml: {
						name: "valorLiquido",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "DeputadoDespesas",
		},
		DeputadoDiscurso: {
			type: "object",
			properties: {
				dataHoraFim: {
					type: "string",
				},
				dataHoraInicio: {
					type: "string",
				},
				faseEvento: {
					$ref: "#/definitions/FaseEvento",
				},
				keywords: {
					type: "string",
				},
				sumario: {
					type: "string",
				},
				tipoDiscurso: {
					type: "string",
				},
				transcricao: {
					type: "string",
				},
				uriEvento: {
					type: "string",
				},
				urlAudio: {
					type: "string",
				},
				urlTexto: {
					type: "string",
				},
				urlVideo: {
					type: "string",
				},
			},
			title: "DeputadoDiscurso",
		},
		DeputadoHistorico: {
			type: "object",
			properties: {
				condicaoEleitoral: {
					type: "string",
				},
				dataHora: {
					type: "string",
				},
				descricaoStatus: {
					type: "string",
				},
				email: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				nomeEleitoral: {
					type: "string",
				},
				siglaPartido: {
					type: "string",
				},
				siglaUf: {
					type: "string",
				},
				situacao: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				uriPartido: {
					type: "string",
				},
				urlFoto: {
					type: "string",
				},
			},
			title: "DeputadoHistorico",
		},
		DeputadoID: {
			type: "object",
			properties: {
				cpf: {
					type: "string",
				},
				dataFalecimento: {
					type: "string",
				},
				dataNascimento: {
					type: "string",
				},
				escolaridade: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int32",
				},
				municipioNascimento: {
					type: "string",
				},
				nomeCivil: {
					type: "string",
				},
				redeSocial: {
					type: "array",
					items: {
						type: "string",
					},
				},
				sexo: {
					type: "string",
				},
				ufNascimento: {
					type: "string",
				},
				ultimoStatus: {
					$ref: "#/definitions/DeputadoUltimoStatus",
				},
				uri: {
					type: "string",
				},
				urlWebsite: {
					type: "string",
				},
			},
			title: "DeputadoID",
		},
		DeputadoMandatoExterno: {
			type: "object",
			properties: {
				anoFim: {
					type: "string",
					xml: {
						name: "anoFim",
						attribute: false,
						wrapped: false,
					},
				},
				anoInicio: {
					type: "string",
					xml: {
						name: "anoInicio",
						attribute: false,
						wrapped: false,
					},
				},
				cargo: {
					type: "string",
					xml: {
						name: "cargo",
						attribute: false,
						wrapped: false,
					},
				},
				municipio: {
					type: "string",
					xml: {
						name: "municipio",
						attribute: false,
						wrapped: false,
					},
				},
				siglaPartidoEleicao: {
					type: "string",
					xml: {
						name: "siglaPartidoEleicao",
						attribute: false,
						wrapped: false,
					},
				},
				siglaUf: {
					type: "string",
					xml: {
						name: "siglaUf",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartidoEleicao: {
					type: "string",
					xml: {
						name: "uriPartidoEleicao",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "DeputadoMandatoExterno",
		},
		DeputadoOcupacoes: {
			type: "object",
			properties: {
				anoFim: {
					type: "integer",
					format: "int32",
					xml: {
						name: "anoFim",
						attribute: false,
						wrapped: false,
					},
				},
				anoInicio: {
					type: "integer",
					format: "int32",
					xml: {
						name: "anoInicio",
						attribute: false,
						wrapped: false,
					},
				},
				entidade: {
					type: "string",
					xml: {
						name: "entidade",
						attribute: false,
						wrapped: false,
					},
				},
				entidadePais: {
					type: "string",
					xml: {
						name: "entidadePais",
						attribute: false,
						wrapped: false,
					},
				},
				entidadeUF: {
					type: "string",
					xml: {
						name: "entidadeUF",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
					xml: {
						name: "titulo",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "DeputadoOcupacoes",
		},
		DeputadoOrgao: {
			type: "object",
			properties: {
				codTitulo: {
					type: "string",
					xml: {
						name: "codTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				dataFim: {
					type: "string",
					xml: {
						name: "dataFim",
						attribute: false,
						wrapped: false,
					},
				},
				dataInicio: {
					type: "string",
					xml: {
						name: "dataInicio",
						attribute: false,
						wrapped: false,
					},
				},
				idOrgao: {
					type: "integer",
					format: "int64",
					xml: {
						name: "idOrgao",
						attribute: false,
						wrapped: false,
					},
				},
				nomeOrgao: {
					type: "string",
					xml: {
						name: "nomeOrgao",
						attribute: false,
						wrapped: false,
					},
				},
				nomePublicacao: {
					type: "string",
					xml: {
						name: "nomePublicacao",
						attribute: false,
						wrapped: false,
					},
				},
				siglaOrgao: {
					type: "string",
					xml: {
						name: "siglaOrgao",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
					xml: {
						name: "titulo",
						attribute: false,
						wrapped: false,
					},
				},
				uriOrgao: {
					type: "string",
					xml: {
						name: "uriOrgao",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "DeputadoOrgao",
		},
		DeputadoProfissoes: {
			type: "object",
			properties: {
				codTipoProfissao: {
					type: "integer",
					format: "int64",
					xml: {
						name: "codTipoProfissao",
						attribute: false,
						wrapped: false,
					},
				},
				dataHora: {
					type: "string",
					xml: {
						name: "dataHora",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
					xml: {
						name: "titulo",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "DeputadoProfissoes",
		},
		DeputadoUltimoStatus: {
			type: "object",
			properties: {
				condicaoEleitoral: {
					type: "string",
				},
				data: {
					type: "string",
				},
				descricaoStatus: {
					type: "string",
				},
				email: {
					type: "string",
					xml: {
						name: "email",
						attribute: false,
						wrapped: false,
					},
				},
				gabinete: {
					$ref: "#/definitions/Gabinete",
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				nomeEleitoral: {
					type: "string",
				},
				siglaPartido: {
					type: "string",
					xml: {
						name: "siglaPartido",
						attribute: false,
						wrapped: false,
					},
				},
				siglaUf: {
					type: "string",
					xml: {
						name: "siglaUf",
						attribute: false,
						wrapped: false,
					},
				},
				situacao: {
					type: "string",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartido: {
					type: "string",
					xml: {
						name: "uriPartido",
						attribute: false,
						wrapped: false,
					},
				},
				urlFoto: {
					type: "string",
					xml: {
						name: "urlFoto",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "DeputadoUltimoStatus",
		},
		EfeitosRegistrados: {
			type: "object",
			properties: {
				dataHoraResultado: {
					type: "string",
				},
				dataHoraUltimaAberturaVotacao: {
					type: "string",
				},
				dataHoraUltimaApresentacaoProposicao: {
					type: "string",
				},
				descResultado: {
					type: "string",
				},
				descUltimaAberturaVotacao: {
					type: "string",
				},
				descUltimaApresentacaoProposicao: {
					type: "string",
				},
				tituloProposicao: {
					type: "string",
				},
				tituloProposicaoCitada: {
					type: "string",
				},
				uriProposicao: {
					type: "string",
				},
				uriProposicaoCitada: {
					type: "string",
				},
			},
			title: "EfeitosRegistrados",
		},
		Eventos: {
			type: "object",
			properties: {
				dataHoraFim: {
					type: "string",
				},
				dataHoraInicio: {
					type: "string",
				},
				descricao: {
					type: "string",
				},
				descricaoTipo: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int32",
				},
				localCamara: {
					$ref: "#/definitions/LocalCamara",
				},
				localExterno: {
					type: "string",
				},
				orgaos: {
					type: "array",
					items: {
						$ref: "#/definitions/Orgao",
					},
				},
				situacao: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				urlRegistro: {
					type: "string",
				},
			},
			title: "Eventos",
		},
		EventosID: {
			type: "object",
			properties: {
				dataHoraFim: {
					type: "string",
				},
				dataHoraInicio: {
					type: "string",
				},
				descricao: {
					type: "string",
				},
				descricaoTipo: {
					type: "string",
				},
				fases: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int32",
				},
				localCamara: {
					xml: {
						name: "localCamara",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/LocalCamara",
				},
				localExterno: {
					type: "string",
				},
				orgaos: {
					type: "array",
					items: {
						$ref: "#/definitions/Orgao",
					},
				},
				requerimentos: {
					type: "array",
					items: {
						$ref: "#/definitions/Requerimento",
					},
				},
				situacao: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				uriConvidados: {
					type: "string",
				},
				uriDeputados: {
					type: "string",
				},
				urlDocumentoPauta: {
					type: "string",
				},
				urlRegistro: {
					type: "string",
				},
			},
			title: "EventosID",
		},
		FaseEvento: {
			type: "object",
			properties: {
				dataHoraFim: {
					type: "string",
				},
				dataHoraInicio: {
					type: "string",
				},
				titulo: {
					type: "string",
				},
			},
			title: "FaseEvento",
		},
		Frente: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int64",
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
				},
				titulo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "Frente",
		},
		FrenteID: {
			type: "object",
			properties: {
				coordenador: {
					$ref: "#/definitions/Deputado",
				},
				email: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
				},
				idSituacao: {
					type: "integer",
					format: "int64",
				},
				keywords: {
					type: "string",
				},
				situacao: {
					type: "string",
				},
				telefone: {
					type: "string",
				},
				titulo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				urlDocumento: {
					type: "string",
				},
				urlWebsite: {
					type: "string",
				},
			},
			title: "FrenteID",
		},
		Gabinete: {
			type: "object",
			properties: {
				andar: {
					type: "string",
				},
				email: {
					type: "string",
				},
				nome: {
					type: "string",
				},
				predio: {
					type: "string",
				},
				sala: {
					type: "string",
				},
				telefone: {
					type: "string",
				},
			},
			title: "Gabinete",
		},
		Grupos: {
			type: "object",
			properties: {
				anoCriacao: {
					type: "string",
					xml: {
						name: "anoCriacao",
						attribute: false,
						wrapped: false,
					},
				},
				ativo: {
					type: "string",
					xml: {
						name: "ativo",
						attribute: false,
						wrapped: false,
					},
				},
				grupoMisto: {
					type: "string",
					xml: {
						name: "grupoMisto",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				observacoes: {
					type: "string",
					xml: {
						name: "observacoes",
						attribute: false,
						wrapped: false,
					},
				},
				resolucaoTitulo: {
					type: "string",
					xml: {
						name: "resolucaoTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				resolucaoUri: {
					type: "string",
					xml: {
						name: "resolucaoUri",
						attribute: false,
						wrapped: false,
					},
				},
				subvencionado: {
					type: "string",
					xml: {
						name: "subvencionado",
						attribute: false,
						wrapped: false,
					},
				},
				ultimoStatus: {
					xml: {
						name: "ultimoStatus",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/UltimoStatus",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Grupos",
		},
		GruposId: {
			type: "object",
			properties: {
				anoCriacao: {
					type: "string",
					xml: {
						name: "anoCriacao",
						attribute: false,
						wrapped: false,
					},
				},
				ativo: {
					type: "string",
					xml: {
						name: "ativo",
						attribute: false,
						wrapped: false,
					},
				},
				grupoMisto: {
					type: "string",
					xml: {
						name: "grupoMisto",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				observacoes: {
					type: "string",
					xml: {
						name: "observacoes",
						attribute: false,
						wrapped: false,
					},
				},
				projetoTitulo: {
					type: "string",
					xml: {
						name: "projetoTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				projetoUri: {
					type: "string",
					xml: {
						name: "projetoUri",
						attribute: false,
						wrapped: false,
					},
				},
				resolucaoTitulo: {
					type: "string",
					xml: {
						name: "resolucaoTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				resolucaoUri: {
					type: "string",
					xml: {
						name: "resolucaoUri",
						attribute: false,
						wrapped: false,
					},
				},
				subvencionado: {
					type: "string",
					xml: {
						name: "subvencionado",
						attribute: false,
						wrapped: false,
					},
				},
				ultimoStatus: {
					xml: {
						name: "ultimoStatus",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/UltimoStatus",
				},
				ultimoStatusID: {
					$ref: "#/definitions/UltimoStatusID",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "GruposId",
		},
		GruposMembros: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				membros: {
					type: "array",
					items: {
						$ref: "#/definitions/Membro",
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "GruposMembros",
		},
		Historico: {
			type: "object",
			properties: {
				dataStatus: {
					type: "string",
					xml: {
						name: "dataStatus",
						attribute: false,
						wrapped: false,
					},
				},
				documentoSGM: {
					type: "string",
					xml: {
						name: "documentoSGM",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "string",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				observacao: {
					type: "string",
					xml: {
						name: "observacao",
						attribute: false,
						wrapped: false,
					},
				},
				oficioAutor: {
					type: "string",
					xml: {
						name: "oficioAutor",
						attribute: false,
						wrapped: false,
					},
				},
				oficioAutorTipo: {
					type: "string",
					xml: {
						name: "oficioAutorTipo",
						attribute: false,
						wrapped: false,
					},
				},
				oficioAutorUri: {
					type: "string",
					xml: {
						name: "oficioAutorUri",
						attribute: false,
						wrapped: false,
					},
				},
				oficioDataApresentacao: {
					type: "string",
					xml: {
						name: "oficioDataApresentacao",
						attribute: false,
						wrapped: false,
					},
				},
				oficioDataPublicacao: {
					type: "string",
					xml: {
						name: "oficioDataPublicacao",
						attribute: false,
						wrapped: false,
					},
				},
				oficioTitulo: {
					type: "string",
					xml: {
						name: "oficioTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				presidente: {
					type: "string",
					xml: {
						name: "presidente",
						attribute: false,
						wrapped: false,
					},
				},
				presidenteUri: {
					type: "string",
					xml: {
						name: "presidenteUri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Historico",
		},
		Legislatura: {
			type: "object",
			properties: {
				dataFim: {
					type: "string",
					xml: {
						name: "dataFim",
						attribute: false,
						wrapped: false,
					},
				},
				dataInicio: {
					type: "string",
					xml: {
						name: "dataInicio",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Legislatura",
		},
		LegislaturaID: {
			type: "object",
			properties: {
				dataFim: {
					type: "string",
					xml: {
						name: "dataFim",
						attribute: false,
						wrapped: false,
					},
				},
				dataInicio: {
					type: "string",
					xml: {
						name: "dataInicio",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				totalAfastados: {
					type: "string",
					xml: {
						name: "totalAfastados",
						attribute: false,
						wrapped: false,
					},
				},
				totalCadeiras: {
					type: "string",
					xml: {
						name: "totalCadeiras",
						attribute: false,
						wrapped: false,
					},
				},
				totalParticipantes: {
					type: "string",
					xml: {
						name: "totalParticipantes",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriMembros: {
					type: "string",
					xml: {
						name: "uriMembros",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "LegislaturaID",
		},
		LegislaturaIDLideres: {
			type: "object",
			properties: {
				bancada: {
					$ref: "#/definitions/BancadaLideres",
				},
				dataFim: {
					type: "string",
				},
				dataInicio: {
					type: "string",
				},
				parlamentar: {
					$ref: "#/definitions/ParlamentarLideres",
				},
				titulo: {
					type: "string",
				},
			},
			title: "LegislaturaIDLideres",
		},
		LegislaturaIDMesa: {
			type: "object",
			properties: {
				codTitulo: {
					type: "string",
				},
				dataFim: {
					type: "string",
				},
				dataInicio: {
					type: "string",
				},
				email: {
					type: "string",
					xml: {
						name: "email",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				siglaPartido: {
					type: "string",
					xml: {
						name: "siglaPartido",
						attribute: false,
						wrapped: false,
					},
				},
				siglaUf: {
					type: "string",
					xml: {
						name: "siglaUf",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartido: {
					type: "string",
					xml: {
						name: "uriPartido",
						attribute: false,
						wrapped: false,
					},
				},
				urlFoto: {
					type: "string",
					xml: {
						name: "urlFoto",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "LegislaturaIDMesa",
		},
		Link: {
			type: "object",
			properties: {
				href: {
					type: "string",
					xml: {
						name: "href",
						attribute: false,
						wrapped: false,
					},
				},
				rel: {
					type: "string",
					xml: {
						name: "rel",
						attribute: false,
						wrapped: false,
					},
				},
				type: {
					type: "string",
				},
			},
			title: "Link",
		},
		LocalCamara: {
			type: "object",
			properties: {
				andar: {
					type: "string",
				},
				nome: {
					type: "string",
				},
				predio: {
					type: "string",
				},
				sala: {
					type: "string",
				},
			},
			title: "LocalCamara",
		},
		Membro: {
			type: "object",
			properties: {
				cargo: {
					type: "string",
					xml: {
						name: "cargo",
						attribute: false,
						wrapped: false,
					},
				},
				dataFim: {
					type: "string",
					xml: {
						name: "dataFim",
						attribute: false,
						wrapped: false,
					},
				},
				dataInicio: {
					type: "string",
					xml: {
						name: "dataInicio",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "string",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				ordemEntrada: {
					type: "integer",
					format: "int64",
					xml: {
						name: "ordemEntrada",
						attribute: false,
						wrapped: false,
					},
				},
				tipo: {
					type: "string",
					xml: {
						name: "tipo",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Membro",
		},
		MembroFrente: {
			type: "object",
			properties: {
				codTitulo: {
					type: "integer",
					format: "int64",
				},
				dataFim: {
					type: "string",
				},
				dataInicio: {
					type: "string",
				},
				email: {
					type: "string",
					xml: {
						name: "email",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				siglaPartido: {
					type: "string",
					xml: {
						name: "siglaPartido",
						attribute: false,
						wrapped: false,
					},
				},
				siglaUf: {
					type: "string",
					xml: {
						name: "siglaUf",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartido: {
					type: "string",
					xml: {
						name: "uriPartido",
						attribute: false,
						wrapped: false,
					},
				},
				urlFoto: {
					type: "string",
					xml: {
						name: "urlFoto",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "MembroFrente",
		},
		Orgao: {
			type: "object",
			properties: {
				apelido: {
					type: "string",
				},
				codTipoOrgao: {
					type: "integer",
					format: "int64",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				nomePublicacao: {
					type: "string",
				},
				nomeResumido: {
					type: "string",
				},
				sigla: {
					type: "string",
				},
				tipoOrgao: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "Orgao",
		},
		OrgaoDetalhe: {
			type: "object",
			properties: {
				apelido: {
					type: "string",
				},
				casa: {
					type: "string",
					xml: {
						name: "casa",
						attribute: false,
						wrapped: false,
					},
				},
				codTipoOrgao: {
					type: "integer",
					format: "int64",
				},
				dataFim: {
					type: "string",
					xml: {
						name: "dataFim",
						attribute: false,
						wrapped: false,
					},
				},
				dataFimOriginal: {
					type: "string",
					xml: {
						name: "dataFimOriginal",
						attribute: false,
						wrapped: false,
					},
				},
				dataInicio: {
					type: "string",
					xml: {
						name: "dataInicio",
						attribute: false,
						wrapped: false,
					},
				},
				dataInstalacao: {
					type: "string",
					xml: {
						name: "dataInstalacao",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				nomePublicacao: {
					type: "string",
				},
				nomeResumido: {
					type: "string",
				},
				sala: {
					type: "string",
					xml: {
						name: "sala",
						attribute: false,
						wrapped: false,
					},
				},
				sigla: {
					type: "string",
				},
				tipoOrgao: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				urlWebsite: {
					type: "string",
					xml: {
						name: "urlWebsite",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "OrgaoDetalhe",
		},
		OrgaoMembros: {
			type: "object",
			properties: {
				codTitulo: {
					type: "integer",
					format: "int64",
				},
				dataFim: {
					type: "string",
				},
				dataInicio: {
					type: "string",
				},
				email: {
					type: "string",
					xml: {
						name: "email",
						attribute: false,
						wrapped: false,
					},
				},
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				siglaPartido: {
					type: "string",
					xml: {
						name: "siglaPartido",
						attribute: false,
						wrapped: false,
					},
				},
				siglaUf: {
					type: "string",
					xml: {
						name: "siglaUf",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartido: {
					type: "string",
					xml: {
						name: "uriPartido",
						attribute: false,
						wrapped: false,
					},
				},
				urlFoto: {
					type: "string",
					xml: {
						name: "urlFoto",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "OrgaoMembros",
		},
		OrgaoNumerador: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int64",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				sigla: {
					type: "string",
					xml: {
						name: "sigla",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "OrgaoNumerador",
		},
		OrgaoSituacao: {
			type: "object",
			properties: {
				codOrgaoEstado: {
					type: "integer",
					format: "int64",
				},
				siglaOrgaoEstado: {
					type: "string",
				},
			},
			title: "OrgaoSituacao",
		},
		Orientacao: {
			type: "object",
			properties: {
				codPartidoBloco: {
					type: "integer",
					format: "int64",
				},
				codTipoLideranca: {
					type: "string",
				},
				orientacaoVoto: {
					type: "string",
				},
				siglaPartidoBloco: {
					type: "string",
				},
				uriPartidoBloco: {
					type: "string",
				},
			},
			title: "Orientacao",
		},
		ParlamentarLideres: {
			type: "object",
			properties: {
				email: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				siglaPartido: {
					type: "string",
				},
				siglaUf: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				uriPartido: {
					type: "string",
				},
				urlFoto: {
					type: "string",
				},
			},
			title: "ParlamentarLideres",
		},
		Partido: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int32",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				sigla: {
					type: "string",
					xml: {
						name: "sigla",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Partido",
		},
		PartidoID: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int32",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				numeroEleitoral: {
					type: "integer",
					format: "int32",
					xml: {
						name: "numeroEleitoral",
						attribute: false,
						wrapped: false,
					},
				},
				sigla: {
					type: "string",
					xml: {
						name: "sigla",
						attribute: false,
						wrapped: false,
					},
				},
				status: {
					xml: {
						name: "status",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/PartidoIDStatus",
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				urlFacebook: {
					type: "string",
					xml: {
						name: "urlFacebook",
						attribute: false,
						wrapped: false,
					},
				},
				urlLogo: {
					type: "string",
					xml: {
						name: "urlLogo",
						attribute: false,
						wrapped: false,
					},
				},
				urlWebSite: {
					type: "string",
					xml: {
						name: "urlWebSite",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "PartidoID",
		},
		PartidoIDStatus: {
			type: "object",
			properties: {
				data: {
					type: "string",
					xml: {
						name: "data",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "string",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				lider: {
					xml: {
						name: "lider",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/PartidoLider",
				},
				situacao: {
					type: "string",
					xml: {
						name: "situacao",
						attribute: false,
						wrapped: false,
					},
				},
				totalMembros: {
					type: "string",
					xml: {
						name: "totalMembros",
						attribute: false,
						wrapped: false,
					},
				},
				totalPosse: {
					type: "string",
					xml: {
						name: "totalPosse",
						attribute: false,
						wrapped: false,
					},
				},
				uriMembros: {
					type: "string",
					xml: {
						name: "uriMembros",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "PartidoIDStatus",
		},
		PartidoLider: {
			type: "object",
			properties: {
				idLegislatura: {
					type: "integer",
					format: "int32",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				siglaPartido: {
					type: "string",
					xml: {
						name: "siglaPartido",
						attribute: false,
						wrapped: false,
					},
				},
				uf: {
					type: "string",
					xml: {
						name: "uf",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
				uriPartido: {
					type: "string",
					xml: {
						name: "uriPartido",
						attribute: false,
						wrapped: false,
					},
				},
				urlFoto: {
					type: "string",
					xml: {
						name: "urlFoto",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "PartidoLider",
		},
		Partido_: {
			type: "object",
			properties: {
				id: {
					type: "string",
					xml: {
						name: "id",
						attribute: false,
						wrapped: false,
					},
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				sigla: {
					type: "string",
					xml: {
						name: "sigla",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Partido_",
		},
		PartidosIDLideres: {
			type: "object",
			properties: {
				codTitulo: {
					type: "integer",
					format: "int64",
				},
				dataFim: {
					type: "string",
				},
				dataInicio: {
					type: "string",
				},
				email: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				idLegislatura: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				siglaPartido: {
					type: "string",
				},
				siglaUf: {
					type: "string",
				},
				titulo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				uriPartido: {
					type: "string",
				},
				urlFoto: {
					type: "string",
				},
			},
			title: "PartidosIDLideres",
		},
		Pauta: {
			type: "object",
			properties: {
				codRegime: {
					type: "integer",
					format: "int64",
					xml: {
						name: "codRegime",
						attribute: false,
						wrapped: false,
					},
				},
				ordem: {
					type: "integer",
					format: "int64",
					xml: {
						name: "ordem",
						attribute: false,
						wrapped: false,
					},
				},
				proposicaoRelacionada_: {
					xml: {
						name: "proposicaoRelacionada_",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/ProposicoesRelacionadas",
				},
				proposicao_: {
					xml: {
						name: "proposicao_",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/ProposicaoRetornoPrincipal",
				},
				regime: {
					type: "string",
					xml: {
						name: "regime",
						attribute: false,
						wrapped: false,
					},
				},
				relator: {
					xml: {
						name: "relator",
						attribute: false,
						wrapped: false,
					},
					$ref: "#/definitions/Deputado",
				},
				situacaoItem: {
					type: "string",
					xml: {
						name: "situacaoItem",
						attribute: false,
						wrapped: false,
					},
				},
				textoParecer: {
					type: "string",
					xml: {
						name: "textoParecer",
						attribute: false,
						wrapped: false,
					},
				},
				titulo: {
					type: "string",
					xml: {
						name: "titulo",
						attribute: false,
						wrapped: false,
					},
				},
				topico: {
					type: "string",
					xml: {
						name: "topico",
						attribute: false,
						wrapped: false,
					},
				},
				uriVotacao: {
					type: "string",
					xml: {
						name: "uriVotacao",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Pauta",
		},
		Principal: {
			type: "object",
			properties: {
				codProposicaoPrincipal: {
					type: "integer",
					format: "int64",
				},
				proposicaoPrincipal: {
					type: "string",
				},
			},
			title: "Principal",
		},
		ProposicaoAutor: {
			type: "object",
			properties: {
				codTipo: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				ordemAssinatura: {
					type: "integer",
					format: "int32",
				},
				proponente: {
					type: "integer",
					format: "int32",
				},
				tipo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "ProposicaoAutor",
		},
		ProposicaoGeral: {
			type: "object",
			properties: {
				ano: {
					type: "integer",
					format: "int64",
				},
				apreciacao: {
					$ref: "#/definitions/Apreciacao",
				},
				autor: {
					$ref: "#/definitions/Autor",
				},
				dataApresentacao: {
					type: "string",
				},
				ementa: {
					type: "string",
				},
				explicacaoEmenta: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				indGenero: {
					type: "string",
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				numero: {
					type: "integer",
					format: "int64",
				},
				orgaoNumerador: {
					$ref: "#/definitions/OrgaoNumerador",
				},
				qtdAutores: {
					type: "integer",
					format: "int64",
				},
				qtdOrgaosComEstado: {
					type: "integer",
					format: "int64",
				},
				regime: {
					$ref: "#/definitions/Regime",
				},
				situacao: {
					$ref: "#/definitions/Situacao",
				},
				tipo: {
					$ref: "#/definitions/TipoProposicao",
				},
				ultimoDespacho: {
					$ref: "#/definitions/UltimoDespacho",
				},
			},
			title: "ProposicaoGeral",
		},
		ProposicaoRetornoPrincipal: {
			type: "object",
			properties: {
				ano: {
					type: "integer",
					format: "int64",
				},
				codTipo: {
					type: "integer",
					format: "int64",
				},
				ementa: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				numero: {
					type: "integer",
					format: "int64",
				},
				siglaTipo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "ProposicaoRetornoPrincipal",
		},
		ProposicaoTema: {
			type: "object",
			properties: {
				codTema: {
					type: "integer",
					format: "int64",
				},
				relevancia: {
					type: "integer",
					format: "int64",
				},
				tema: {
					type: "string",
				},
			},
			title: "ProposicaoTema",
		},
		ProposicaoTramitacao: {
			type: "object",
			properties: {
				ambito: {
					type: "string",
				},
				apreciacao: {
					type: "string",
				},
				codSituacao: {
					type: "integer",
					format: "int64",
				},
				codTipoTramitacao: {
					type: "string",
				},
				dataHora: {
					type: "string",
				},
				descricaoSituacao: {
					type: "string",
				},
				descricaoTramitacao: {
					type: "string",
				},
				despacho: {
					type: "string",
				},
				regime: {
					type: "string",
				},
				sequencia: {
					type: "integer",
					format: "int64",
				},
				siglaOrgao: {
					type: "string",
				},
				uriOrgao: {
					type: "string",
				},
				uriUltimoRelator: {
					type: "string",
				},
				url: {
					type: "string",
				},
			},
			title: "ProposicaoTramitacao",
		},
		ProposicoesRelacionadas: {
			type: "object",
			properties: {
				ano: {
					type: "string",
				},
				codTipo: {
					type: "string",
				},
				ementa: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				numero: {
					type: "string",
				},
				siglaTipo: {
					type: "string",
				},
				uri: {
					type: "string",
				},
			},
			title: "ProposicoesRelacionadas",
		},
		Referencia: {
			type: "object",
			properties: {
				cod: {
					type: "string",
					xml: {
						name: "cod",
						attribute: false,
						wrapped: false,
					},
				},
				descricao: {
					type: "string",
				},
				nome: {
					type: "string",
					xml: {
						name: "nome",
						attribute: false,
						wrapped: false,
					},
				},
				sigla: {
					type: "string",
					xml: {
						name: "sigla",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Referencia",
		},
		ReferenciaDeputado: {
			type: "object",
			properties: {
				codTipoProfissao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				siglaSituacao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				siglaUF: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
			},
			title: "ReferenciaDeputado",
		},
		ReferenciaEvento: {
			type: "object",
			properties: {
				codSituacao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				codTipoEvento: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
			},
			title: "ReferenciaEvento",
		},
		ReferenciaOrgao: {
			type: "object",
			properties: {
				idSituacao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				idTipoOrgao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
			},
			title: "ReferenciaOrgao",
		},
		ReferenciaProposicao: {
			type: "object",
			properties: {
				codSituacao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				codTema: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				codTipoAutor: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				siglaTipo: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				tiposTramitacao: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
			},
			title: "ReferenciaProposicao",
		},
		Regime: {
			type: "object",
			properties: {
				descricao: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
			},
			title: "Regime",
		},
		Requerimento: {
			type: "object",
			properties: {
				titulo: {
					type: "string",
					xml: {
						name: "titulo",
						attribute: false,
						wrapped: false,
					},
				},
				uri: {
					type: "string",
					xml: {
						name: "uri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "Requerimento",
		},
		ResultadoBloco: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Bloco",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoBloco",
		},
		ResultadoBlocoID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/BlocoID",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoBlocoID",
		},
		ResultadoDeputado: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Deputado",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputado",
		},
		ResultadoDeputadoDespesas: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoDespesas",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoDespesas",
		},
		ResultadoDeputadoDiscurso: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoDiscurso",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoDiscurso",
		},
		ResultadoDeputadoEventos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Eventos",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoEventos",
		},
		ResultadoDeputadoHistorico: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoHistorico",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoHistorico",
		},
		ResultadoDeputadoID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/DeputadoID",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoID",
		},
		ResultadoDeputadoMandatoExterno: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoMandatoExterno",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoMandatoExterno",
		},
		ResultadoDeputadoOrgaos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoOrgao",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoOrgaos",
		},
		ResultadoDeputadoProfissoes: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoProfissoes",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoDeputadoProfissoes",
		},
		ResultadoEventoOrgao: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Orgao",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoEventoOrgao",
		},
		ResultadoEventos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Eventos",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoEventos",
		},
		ResultadoEventosDeputado: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Deputado",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoEventosDeputado",
		},
		ResultadoEventosID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/EventosID",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoEventosID",
		},
		ResultadoEventosPauta: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Pauta",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoEventosPauta",
		},
		ResultadoFrenteID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/FrenteID",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoFrenteID",
		},
		ResultadoFrentes: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Frente",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoFrentes",
		},
		ResultadoGrupos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Grupos",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoGrupos",
		},
		ResultadoGruposHistorico: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Historico",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoGruposHistorico",
		},
		ResultadoGruposID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/GruposId",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoGruposID",
		},
		ResultadoGruposMembros: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/GruposMembros",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoGruposMembros",
		},
		ResultadoIdDeputadoMembro: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Frente",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoIdDeputadoMembro",
		},
		ResultadoLegislaturaIDLideres: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/LegislaturaIDLideres",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoLegislaturaIDLideres",
		},
		ResultadoLegislaturaIDMesa: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/LegislaturaIDMesa",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoLegislaturaIDMesa",
		},
		ResultadoLegislaturas: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Legislatura",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoLegislaturas",
		},
		ResultadoLegislaturasDetalhe: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/Legislatura",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoLegislaturasDetalhe",
		},
		ResultadoMembroFrente: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/MembroFrente",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoMembroFrente",
		},
		ResultadoOcupacoesDeputado: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/DeputadoOcupacoes",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoOcupacoesDeputado",
		},
		ResultadoOrgaoDetalhe: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/OrgaoDetalhe",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoOrgaoDetalhe",
		},
		ResultadoOrgaoEventos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Eventos",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoOrgaoEventos",
		},
		ResultadoOrgaoMembros: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/OrgaoMembros",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoOrgaoMembros",
		},
		ResultadoOrgaos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Orgao",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoOrgaos",
		},
		ResultadoPartidos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Partido",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoPartidos",
		},
		ResultadoPartidosID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/PartidoID",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoPartidosID",
		},
		ResultadoPartidosIDLideresVice: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/PartidosIDLideres",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoPartidosIDLideresVice",
		},
		ResultadoPartidosIDMembros: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Deputado",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoPartidosIDMembros",
		},
		ResultadoProposicoes: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						type: "object",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoProposicoes",
		},
		ResultadoProposicoesAutores: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/ProposicaoAutor",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoProposicoesAutores",
		},
		ResultadoProposicoesRelacionadas: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/ProposicoesRelacionadas",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoProposicoesRelacionadas",
		},
		ResultadoProposicoesTema: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/ProposicaoTema",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoProposicoesTema",
		},
		ResultadoProposicoesTramitacao: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/ProposicaoTramitacao",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoProposicoesTramitacao",
		},
		"ResultadoReferenciaSubResource«ReferenciaDeputado»": {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/ReferenciaDeputado",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoReferenciaSubResource«ReferenciaDeputado»",
		},
		"ResultadoReferenciaSubResource«ReferenciaEvento»": {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/ReferenciaEvento",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoReferenciaSubResource«ReferenciaEvento»",
		},
		"ResultadoReferenciaSubResource«ReferenciaOrgao»": {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/ReferenciaOrgao",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoReferenciaSubResource«ReferenciaOrgao»",
		},
		"ResultadoReferenciaSubResource«ReferenciaProposicao»": {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/ReferenciaProposicao",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoReferenciaSubResource«ReferenciaProposicao»",
		},
		ResultadoReferencias: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Referencia",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoReferencias",
		},
		ResultadoVotacoes: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Votacao",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoVotacoes",
		},
		ResultadoVotacoesID: {
			type: "object",
			properties: {
				dados: {
					$ref: "#/definitions/VotacaoID",
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoVotacoesID",
		},
		ResultadoVotacoesIDOrientacoes: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Orientacao",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoVotacoesIDOrientacoes",
		},
		ResultadoVotacoesIDVotos: {
			type: "object",
			properties: {
				dados: {
					type: "array",
					items: {
						$ref: "#/definitions/Votos",
					},
				},
				links: {
					type: "array",
					items: {
						$ref: "#/definitions/Link",
					},
				},
			},
			title: "ResultadoVotacoesIDVotos",
		},
		Situacao: {
			type: "object",
			properties: {
				descricao: {
					type: "string",
				},
				id: {
					type: "integer",
					format: "int64",
				},
				orgao: {
					$ref: "#/definitions/OrgaoSituacao",
				},
				principal: {
					$ref: "#/definitions/Principal",
				},
			},
			title: "Situacao",
		},
		TipoProposicao: {
			type: "object",
			properties: {
				id: {
					type: "integer",
					format: "int64",
				},
				nome: {
					type: "string",
				},
				sigla: {
					type: "string",
				},
			},
			title: "TipoProposicao",
		},
		UltimaApresentacaoProposicao: {
			type: "object",
			properties: {
				dataHoraRegistro: {
					type: "string",
				},
				descricao: {
					type: "string",
				},
				uriProposicaoCitada: {
					type: "string",
				},
			},
			title: "UltimaApresentacaoProposicao",
		},
		UltimoDespacho: {
			type: "object",
			properties: {
				data: {
					type: "string",
					format: "date-time",
					xml: {
						name: "data",
						attribute: false,
						wrapped: false,
					},
				},
				descricao: {
					type: "string",
					xml: {
						name: "descricao",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "UltimoDespacho",
		},
		UltimoStatus: {
			type: "object",
			properties: {
				dataStatus: {
					type: "string",
					xml: {
						name: "dataStatus",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "string",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				oficioTitulo: {
					type: "string",
					xml: {
						name: "oficioTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				oficioUri: {
					type: "string",
					xml: {
						name: "oficioUri",
						attribute: false,
						wrapped: false,
					},
				},
				presidenteNome: {
					type: "string",
					xml: {
						name: "presidenteNome",
						attribute: false,
						wrapped: false,
					},
				},
				presidenteUri: {
					type: "string",
					xml: {
						name: "presidenteUri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "UltimoStatus",
		},
		UltimoStatusID: {
			type: "object",
			properties: {
				dataStatus: {
					type: "string",
					xml: {
						name: "dataStatus",
						attribute: false,
						wrapped: false,
					},
				},
				documento: {
					type: "string",
					xml: {
						name: "documento",
						attribute: false,
						wrapped: false,
					},
				},
				idLegislatura: {
					type: "string",
					xml: {
						name: "idLegislatura",
						attribute: false,
						wrapped: false,
					},
				},
				oficioAutorNome: {
					type: "string",
					xml: {
						name: "oficioAutorNome",
						attribute: false,
						wrapped: false,
					},
				},
				oficioAutorTipo: {
					type: "string",
					xml: {
						name: "oficioAutorTipo",
						attribute: false,
						wrapped: false,
					},
				},
				oficioAutorUri: {
					type: "string",
					xml: {
						name: "oficioAutorUri",
						attribute: false,
						wrapped: false,
					},
				},
				oficioDataApresentacao: {
					type: "string",
					xml: {
						name: "oficioDataApresentacao",
						attribute: false,
						wrapped: false,
					},
				},
				oficioDataPublicacao: {
					type: "string",
					xml: {
						name: "oficioDataPublicacao",
						attribute: false,
						wrapped: false,
					},
				},
				oficioTitulo: {
					type: "string",
					xml: {
						name: "oficioTitulo",
						attribute: false,
						wrapped: false,
					},
				},
				oficioUri: {
					type: "string",
					xml: {
						name: "oficioUri",
						attribute: false,
						wrapped: false,
					},
				},
				presidenteNome: {
					type: "string",
					xml: {
						name: "presidenteNome",
						attribute: false,
						wrapped: false,
					},
				},
				presidenteUri: {
					type: "string",
					xml: {
						name: "presidenteUri",
						attribute: false,
						wrapped: false,
					},
				},
			},
			title: "UltimoStatusID",
		},
		Votacao: {
			type: "object",
			properties: {
				aprovacao: {
					type: "integer",
					format: "int64",
				},
				data: {
					type: "string",
				},
				dataHoraRegistro: {
					type: "string",
				},
				descricao: {
					type: "string",
				},
				id: {
					type: "string",
				},
				proposicaoObjeto: {
					type: "string",
				},
				siglaOrgao: {
					type: "string",
				},
				uri: {
					type: "string",
				},
				uriEvento: {
					type: "string",
				},
				uriOrgao: {
					type: "string",
				},
				uriProposicaoObjeto: {
					type: "string",
				},
			},
			title: "Votacao",
		},
		VotacaoID: {
			type: "object",
			properties: {
				aprovacao: {
					type: "integer",
					format: "int64",
				},
				data: {
					type: "string",
				},
				dataHoraRegistro: {
					type: "string",
				},
				dataHoraUltimaAberturaVotacao: {
					type: "string",
				},
				descUltimaAberturaVotacao: {
					type: "string",
				},
				descricao: {
					type: "string",
				},
				efeitosRegistrados: {
					type: "array",
					items: {
						$ref: "#/definitions/EfeitosRegistrados",
					},
				},
				id: {
					type: "string",
				},
				idEvento: {
					type: "integer",
					format: "int64",
				},
				idOrgao: {
					type: "integer",
					format: "int64",
				},
				objetosPossiveis: {
					type: "array",
					items: {
						$ref: "#/definitions/ProposicaoRetornoPrincipal",
					},
				},
				proposicoesAfetadas: {
					type: "array",
					items: {
						$ref: "#/definitions/ProposicaoRetornoPrincipal",
					},
				},
				siglaOrgao: {
					type: "string",
				},
				ultimaApresentacaoProposicao: {
					$ref: "#/definitions/UltimaApresentacaoProposicao",
				},
				uri: {
					type: "string",
				},
				uriEvento: {
					type: "string",
				},
				uriOrgao: {
					type: "string",
				},
			},
			title: "VotacaoID",
		},
		Votos: {
			type: "object",
			properties: {
				dataRegistroVoto: {
					type: "string",
				},
				deputado_: {
					$ref: "#/definitions/Deputado",
				},
				tipoVoto: {
					type: "string",
				},
			},
			title: "Votos",
		},
	},
};
