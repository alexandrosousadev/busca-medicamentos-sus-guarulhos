import random, json
from guarulhos import ubs_guarulhos, remedios_guarulhos
from estado_sp import remedios_estado_sp

resultado_data_guarulhos = []

for remedio in remedios_guarulhos:
    endereco_aleatorio = random.choice(ubs_guarulhos)
    
    novo_remedio = {
        "nome": remedio["nome"],
        "endereco": {
            "nome": endereco_aleatorio["nome"],
            "endereco": endereco_aleatorio["endereco"]
        }
    }
    
    resultado_data_guarulhos.append(novo_remedio)

with open('data_guarulhos.json', 'w') as f:
    json.dump(resultado_data_guarulhos, f)

with open('data_estado_sp.json', 'w') as f:
    json.dump(remedios_estado_sp, f)