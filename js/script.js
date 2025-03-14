$(document).ready(function() {
	
	$("#txtPrecoVeiculo").blur(function() {
		
		if ($(this).val().trim() === "") {
			
			Swal.fire({
				title: "Oops!",
				text: "É necessário informar o preço do veículo!",
				icon: "error"
			});
			
		} else {
			
			$("#slcEstado").prop("disabled", false);
			
		}
		
	});
	
	$("#slcEstado").blur(function() {
		
		if ($(this).find(":selected").val() === "") {
			
			Swal.fire({
				title: "Oops!",
				text: "É necessário selecionar o Estado!",
				icon: "error"
			});
			
		} else {
			
			$("#txtIpva").val(calcularIpva($("#txtPrecoVeiculo").val(), $(this).find(":selected").val()));
			
		}
		
	});
	
	$("#btnLimpar").on("click", function() {
		
		$("#txtPrecoVeiculo").val("");
		$("#slcEstado").val("");
		$("#slcEstado").prop("disabled", true);
		$("#txtIpva").val("");
		$("#txtPrecoVeiculo").focus();
		
	});
	
});

/**
 * Função responsável pela máscara monetária do campo 'Preço do Veículo'.
 */
function monetaryMask(event) {
	let valor = event.target.value;
	valor = valor.replace(/[^\d]+/g, "");
	valor = valor.replace(/(\d)(\d{3})(\d{1,2}$)/, "$1.$2,$3");
	event.target.value = "R$ " + valor;
}

/**
 * Função responsável pelo cálculo do IPVA dos veículos.
 */
function calcularIpva(precoVeiculo, aliquota) {
	return new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Number(precoVeiculo.replace(/[^0-9]+/g, "").replace("00", "")) * aliquota);
}