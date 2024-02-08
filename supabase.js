// Create a single supabase client for interacting with your database
const db = supabase.createClient('URL', 'KEY');

const getCliente = async () => {
	
	const reqClientes = await db.from("cliente").select("id,nome");
	var listaClientes = "";
	var link = "";

	for (var i = 0; i <= reqClientes.data.length - 1; i++) {
		const reqEquip = await db.from("equipamento").select("ip").eq("id_cliente", reqClientes.data[i].id);

		for (var j = 0; j <= reqEquip.data.length - 1; j++) {
			if (j == reqEquip.data.length - 1) {
				link += reqEquip.data[j].ip;
				break;
			}
			link += reqEquip.data[j].ip + "_";
		}
		listaClientes += '<a href="testeurl:' + link + '" target="_blank"> <button>' + reqClientes.data[i].nome + '</button> </a> <br> <br>';
		link = "";
	}
	document.getElementById("clientes").innerHTML = listaClientes;
}

getCliente();