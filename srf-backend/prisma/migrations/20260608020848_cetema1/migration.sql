/*
  Warnings:

  - The primary key for the `agente_sorologico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `agente_sorologico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `agente_suspeito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `agente_suspeito` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `alocacao_amostra_necropsia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_envio` on the `alocacao_amostra_necropsia` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `alocacao_amostra_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_necropsia` on the `alocacao_amostra_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_amostra` on the `alocacao_amostra_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_armazenamento` on the `alocacao_amostra_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_status` on the `alocacao_amostra_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `alocacao_amostra_veterinario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data_envio` on the `alocacao_amostra_veterinario` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `alocacao_amostra_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `alocacao_amostra_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_amostra` on the `alocacao_amostra_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_armazenamento` on the `alocacao_amostra_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_status` on the `alocacao_amostra_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_ectoparasito_necropsia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `analise_ectoparasito_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_necropsia` on the `analise_ectoparasito_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_genero_ectoparasito` on the `analise_ectoparasito_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie_ectoparasito` on the `analise_ectoparasito_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_subespecie_ectoparasito` on the `analise_ectoparasito_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_ectoparasito_veterinario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `analise_ectoparasito_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `analise_ectoparasito_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_genero_ectoparasito` on the `analise_ectoparasito_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie_ectoparasito` on the `analise_ectoparasito_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_subespecie_ectoparasito` on the `analise_ectoparasito_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_fezes` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `analise_fezes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `analise_fezes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tecnologia_processamento` on the `analise_fezes` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_helminto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `analise_helminto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_necropsia` on the `analise_helminto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie_helminto` on the `analise_helminto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_molecular` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `analise_molecular` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_analise_fezes` on the `analise_molecular` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie_ovo_cisto` on the `analise_molecular` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_ovo_cisto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `analise_ovo_cisto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_analise_fezes` on the `analise_ovo_cisto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie_ovo_cisto` on the `analise_ovo_cisto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `analise_sorologica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_amostra` on the `analise_sorologica` table. All the data in the column will be lost.
  - You are about to drop the column `ponto_corte` on the `analise_sorologica` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `analise_sorologica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `analise_sorologica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_teste_sorologico` on the `analise_sorologica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_agente_sorologico` on the `analise_sorologica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_interpretacao` on the `analise_sorologica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `animal_morto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_grupo_animal_morto` on the `animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie` on the `animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_origem_animal_morto` on the `animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_status_animal_morto` on the `animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_responsavel_coleta` on the `animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `animal_vivo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `animal_vivo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_especie` on the `animal_vivo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_genero` on the `animal_vivo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `aplicacao_vacina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `aplicacao_vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_animal_vivo` on the `aplicacao_vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_vacina` on the `aplicacao_vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `aplicacao_vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_vacina` on the `aplicacao_vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `armazem` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `armazem` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `castracao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `castracao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_animal_vivo` on the `castracao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `castracao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `dispositivo_rastreio` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `dispositivo_rastreio` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `entrevista_animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `entrevista_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_animal_vivo` on the `entrevista_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `entrevista_tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `entrevista_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tutor` on the `entrevista_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_condicao_reprodutiva` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_condicao_reprodutiva` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_estado_clinico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_estado_clinico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_estado_corporal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_estado_corporal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_estado_geral` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_estado_geral` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_estado_geral_exame_fisico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_estado_geral_exame_fisico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_faixa_etaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_faixa_etaria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_genero` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_genero` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_genero_animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_genero_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_hidratacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_hidratacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_interpretacao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_interpretacao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_interpretacao_analise_sorologica` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_interpretacao_analise_sorologica` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_interpretacao_valor_exame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_interpretacao_valor_exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_metodo_cpcr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_metodo_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_mucosa` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_mucosa` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_origem_animal_morto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_origem_animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_status_animal_morto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_status_animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_status_cpcr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_status_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_status_qpcr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_status_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `enum_tipo_vacina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `enum_tipo_vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `especie` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `especie` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `especie_ectoparasito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `especie_ectoparasito` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `especie_helminto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `especie_helminto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `especie_ovo_cisto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `especie_ovo_cisto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `exame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_estado_geral` on the `exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_interpretacao` on the `exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `exame_fisico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `exame_fisico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `exame_fisico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_estado_geral` on the `exame_fisico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_mucosa` on the `exame_fisico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_hidratacao` on the `exame_fisico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `gene_alvo` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `gene_alvo` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `genero_ectoparasito` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `genero_ectoparasito` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `grupo_animal_morto` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `grupo_animal_morto` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `medida_corporal_necropsia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `medida_corporal_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_necropsia` on the `medida_corporal_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_medida_corporal` on the `medida_corporal_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `medida_corporal_veterinario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `medida_corporal_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_visita_veterinaria` on the `medida_corporal_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_medida_corporal` on the `medida_corporal_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `metodo_monitoramento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `metodo_monitoramento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `necropsia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_animal_morto` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_estado_corporal` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_estado_clinico` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tutor` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_condicao_reprodutiva` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_faixa_etaria` on the `necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `opcao_resposta_animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `opcao_resposta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pergunta_animal` on the `opcao_resposta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `opcao_resposta_tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `opcao_resposta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pergunta_tutor` on the `opcao_resposta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `pergunta_animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pergunta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `pergunta_tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `pergunta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `rastreio_gps` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `rastreio_gps` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_animal_vivo` on the `rastreio_gps` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_dispositivo_rastreio` on the `rastreio_gps` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_metodo_monitoramento` on the `rastreio_gps` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `responsavel_coleta` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `responsavel_coleta` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `resposta_animal` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `resposta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_entrevista_animal` on the `resposta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pergunta_animal` on the `resposta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_opcao_resposta_animal` on the `resposta_animal` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `resposta_tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `resposta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_entrevista_tutor` on the `resposta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_pergunta_tutor` on the `resposta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_opcao_resposta_tutor` on the `resposta_tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `resultado_cpcr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_necropsia` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_amostra` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_extracao` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_gene_alvo` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_agente_suspeito` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_metodo_cpcr` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_resultado_cpcr` on the `resultado_cpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `resultado_qpcr` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `resultado_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_necropsia` on the `resultado_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_amostra` on the `resultado_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_gene_alvo` on the `resultado_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_agente_suspeito` on the `resultado_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_resultado_qpcr` on the `resultado_qpcr` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tecnologia_processamento` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tecnologia_processamento` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `teste_sorologico` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `teste_sorologico` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tipo_exame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tipo_exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tipo_extracao` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tipo_extracao` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tipo_medida_corporal_necropsia` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tipo_medida_corporal_necropsia` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tipo_medida_corporal_veterinario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tipo_medida_corporal_veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `tutor` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_genero` on the `tutor` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `vacina` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `vacina` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `valor_exame` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `valor_exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_exame` on the `valor_exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_tipo_exame` on the `valor_exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_interpretacao` on the `valor_exame` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `veterinario` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `id` on the `veterinario` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - The primary key for the `visita_veterinaria` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `link_carteirinha` on the `visita_veterinaria` table. All the data in the column will be lost.
  - You are about to alter the column `id` on the `visita_veterinaria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_animal_vivo` on the `visita_veterinaria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to alter the column `id_veterinario` on the `visita_veterinaria` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Int`.
  - You are about to drop the `enum_status_alocacao_amostra` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tipo_amostra` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[id_necropsia,id_tipo_amostra]` on the table `alocacao_amostra_necropsia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_visita_veterinaria,id_tipo_amostra]` on the table `alocacao_amostra_veterinario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_necropsia,id_genero_ectoparasito,id_especie_ectoparasito,id_subespecie_ectoparasito]` on the table `analise_ectoparasito_necropsia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_visita_veterinaria,id_genero_ectoparasito,id_especie_ectoparasito,id_subespecie_ectoparasito]` on the table `analise_ectoparasito_veterinario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_analise_fezes,id_especie_ovo_cisto]` on the table `analise_molecular` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_analise_fezes,id_especie_ovo_cisto]` on the table `analise_ovo_cisto` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_visita_veterinaria]` on the table `analise_sorologica` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_necropsia,id_tipo_medida_corporal]` on the table `medida_corporal_necropsia` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_visita_veterinaria,id_tipo_medida_corporal]` on the table `medida_corporal_veterinario` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pergunta]` on the table `pergunta_animal` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[pergunta]` on the table `pergunta_tutor` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[id_animal_vivo,id_veterinario,data]` on the table `visita_veterinaria` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `quantidade` to the `alocacao_amostra_necropsia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantidade` to the `alocacao_amostra_veterinario` table without a default value. This is not possible if the table is not empty.
  - Added the required column `id_tipo_resultado` to the `analise_sorologica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `simbolo_ponto_corte` to the `analise_sorologica` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valor_ponto_corte` to the `analise_sorologica` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `alocacao_amostra_necropsia` DROP FOREIGN KEY `alocacao_amostra_necropsia_id_armazenamento_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_necropsia` DROP FOREIGN KEY `alocacao_amostra_necropsia_id_necropsia_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_necropsia` DROP FOREIGN KEY `alocacao_amostra_necropsia_id_status_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_necropsia` DROP FOREIGN KEY `alocacao_amostra_necropsia_id_tipo_amostra_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_veterinario` DROP FOREIGN KEY `alocacao_amostra_veterinario_id_armazenamento_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_veterinario` DROP FOREIGN KEY `alocacao_amostra_veterinario_id_status_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_veterinario` DROP FOREIGN KEY `alocacao_amostra_veterinario_id_tipo_amostra_fkey`;

-- DropForeignKey
ALTER TABLE `alocacao_amostra_veterinario` DROP FOREIGN KEY `alocacao_amostra_veterinario_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` DROP FOREIGN KEY `analise_ectoparasito_necropsia_id_especie_ectoparasito_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` DROP FOREIGN KEY `analise_ectoparasito_necropsia_id_genero_ectoparasito_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` DROP FOREIGN KEY `analise_ectoparasito_necropsia_id_necropsia_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` DROP FOREIGN KEY `analise_ectoparasito_necropsia_id_subespecie_ectoparasito_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` DROP FOREIGN KEY `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` DROP FOREIGN KEY `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` DROP FOREIGN KEY `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` DROP FOREIGN KEY `analise_ectoparasito_veterinario_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `analise_fezes` DROP FOREIGN KEY `analise_fezes_id_tecnologia_processamento_fkey`;

-- DropForeignKey
ALTER TABLE `analise_fezes` DROP FOREIGN KEY `analise_fezes_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `analise_helminto` DROP FOREIGN KEY `analise_helminto_id_especie_helminto_fkey`;

-- DropForeignKey
ALTER TABLE `analise_helminto` DROP FOREIGN KEY `analise_helminto_id_necropsia_fkey`;

-- DropForeignKey
ALTER TABLE `analise_molecular` DROP FOREIGN KEY `analise_molecular_id_analise_fezes_fkey`;

-- DropForeignKey
ALTER TABLE `analise_molecular` DROP FOREIGN KEY `analise_molecular_id_especie_ovo_cisto_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ovo_cisto` DROP FOREIGN KEY `analise_ovo_cisto_id_analise_fezes_fkey`;

-- DropForeignKey
ALTER TABLE `analise_ovo_cisto` DROP FOREIGN KEY `analise_ovo_cisto_id_especie_ovo_cisto_fkey`;

-- DropForeignKey
ALTER TABLE `analise_sorologica` DROP FOREIGN KEY `analise_sorologica_id_agente_sorologico_fkey`;

-- DropForeignKey
ALTER TABLE `analise_sorologica` DROP FOREIGN KEY `analise_sorologica_id_amostra_fkey`;

-- DropForeignKey
ALTER TABLE `analise_sorologica` DROP FOREIGN KEY `analise_sorologica_id_interpretacao_fkey`;

-- DropForeignKey
ALTER TABLE `analise_sorologica` DROP FOREIGN KEY `analise_sorologica_id_teste_sorologico_fkey`;

-- DropForeignKey
ALTER TABLE `analise_sorologica` DROP FOREIGN KEY `analise_sorologica_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `animal_morto` DROP FOREIGN KEY `animal_morto_id_especie_fkey`;

-- DropForeignKey
ALTER TABLE `animal_morto` DROP FOREIGN KEY `animal_morto_id_grupo_animal_morto_fkey`;

-- DropForeignKey
ALTER TABLE `animal_morto` DROP FOREIGN KEY `animal_morto_id_origem_animal_morto_fkey`;

-- DropForeignKey
ALTER TABLE `animal_morto` DROP FOREIGN KEY `animal_morto_id_responsavel_coleta_fkey`;

-- DropForeignKey
ALTER TABLE `animal_morto` DROP FOREIGN KEY `animal_morto_id_status_animal_morto_fkey`;

-- DropForeignKey
ALTER TABLE `animal_vivo` DROP FOREIGN KEY `animal_vivo_id_especie_fkey`;

-- DropForeignKey
ALTER TABLE `animal_vivo` DROP FOREIGN KEY `animal_vivo_id_genero_fkey`;

-- DropForeignKey
ALTER TABLE `aplicacao_vacina` DROP FOREIGN KEY `aplicacao_vacina_id_animal_vivo_fkey`;

-- DropForeignKey
ALTER TABLE `aplicacao_vacina` DROP FOREIGN KEY `aplicacao_vacina_id_tipo_vacina_fkey`;

-- DropForeignKey
ALTER TABLE `aplicacao_vacina` DROP FOREIGN KEY `aplicacao_vacina_id_vacina_fkey`;

-- DropForeignKey
ALTER TABLE `aplicacao_vacina` DROP FOREIGN KEY `aplicacao_vacina_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `castracao` DROP FOREIGN KEY `castracao_id_animal_vivo_fkey`;

-- DropForeignKey
ALTER TABLE `castracao` DROP FOREIGN KEY `castracao_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `entrevista_animal` DROP FOREIGN KEY `entrevista_animal_id_animal_vivo_fkey`;

-- DropForeignKey
ALTER TABLE `entrevista_tutor` DROP FOREIGN KEY `entrevista_tutor_id_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `exame` DROP FOREIGN KEY `exame_id_estado_geral_fkey`;

-- DropForeignKey
ALTER TABLE `exame` DROP FOREIGN KEY `exame_id_interpretacao_fkey`;

-- DropForeignKey
ALTER TABLE `exame` DROP FOREIGN KEY `exame_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `exame_fisico` DROP FOREIGN KEY `exame_fisico_id_estado_geral_fkey`;

-- DropForeignKey
ALTER TABLE `exame_fisico` DROP FOREIGN KEY `exame_fisico_id_hidratacao_fkey`;

-- DropForeignKey
ALTER TABLE `exame_fisico` DROP FOREIGN KEY `exame_fisico_id_mucosa_fkey`;

-- DropForeignKey
ALTER TABLE `exame_fisico` DROP FOREIGN KEY `exame_fisico_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `medida_corporal_necropsia` DROP FOREIGN KEY `medida_corporal_necropsia_id_necropsia_fkey`;

-- DropForeignKey
ALTER TABLE `medida_corporal_necropsia` DROP FOREIGN KEY `medida_corporal_necropsia_id_tipo_medida_corporal_fkey`;

-- DropForeignKey
ALTER TABLE `medida_corporal_veterinario` DROP FOREIGN KEY `medida_corporal_veterinario_id_tipo_medida_corporal_fkey`;

-- DropForeignKey
ALTER TABLE `medida_corporal_veterinario` DROP FOREIGN KEY `medida_corporal_veterinario_id_visita_veterinaria_fkey`;

-- DropForeignKey
ALTER TABLE `necropsia` DROP FOREIGN KEY `necropsia_id_animal_morto_fkey`;

-- DropForeignKey
ALTER TABLE `necropsia` DROP FOREIGN KEY `necropsia_id_condicao_reprodutiva_fkey`;

-- DropForeignKey
ALTER TABLE `necropsia` DROP FOREIGN KEY `necropsia_id_estado_clinico_fkey`;

-- DropForeignKey
ALTER TABLE `necropsia` DROP FOREIGN KEY `necropsia_id_estado_corporal_fkey`;

-- DropForeignKey
ALTER TABLE `necropsia` DROP FOREIGN KEY `necropsia_id_faixa_etaria_fkey`;

-- DropForeignKey
ALTER TABLE `necropsia` DROP FOREIGN KEY `necropsia_id_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `opcao_resposta_animal` DROP FOREIGN KEY `opcao_resposta_animal_id_pergunta_animal_fkey`;

-- DropForeignKey
ALTER TABLE `opcao_resposta_tutor` DROP FOREIGN KEY `opcao_resposta_tutor_id_pergunta_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `rastreio_gps` DROP FOREIGN KEY `rastreio_gps_id_animal_vivo_fkey`;

-- DropForeignKey
ALTER TABLE `rastreio_gps` DROP FOREIGN KEY `rastreio_gps_id_dispositivo_rastreio_fkey`;

-- DropForeignKey
ALTER TABLE `rastreio_gps` DROP FOREIGN KEY `rastreio_gps_id_metodo_monitoramento_fkey`;

-- DropForeignKey
ALTER TABLE `resposta_animal` DROP FOREIGN KEY `resposta_animal_id_entrevista_animal_fkey`;

-- DropForeignKey
ALTER TABLE `resposta_animal` DROP FOREIGN KEY `resposta_animal_id_opcao_resposta_animal_fkey`;

-- DropForeignKey
ALTER TABLE `resposta_animal` DROP FOREIGN KEY `resposta_animal_id_pergunta_animal_fkey`;

-- DropForeignKey
ALTER TABLE `resposta_tutor` DROP FOREIGN KEY `resposta_tutor_id_entrevista_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `resposta_tutor` DROP FOREIGN KEY `resposta_tutor_id_opcao_resposta_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `resposta_tutor` DROP FOREIGN KEY `resposta_tutor_id_pergunta_tutor_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_agente_suspeito_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_gene_alvo_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_metodo_cpcr_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_necropsia_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_resultado_cpcr_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_tipo_amostra_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_cpcr` DROP FOREIGN KEY `resultado_cpcr_id_tipo_extracao_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_qpcr` DROP FOREIGN KEY `resultado_qpcr_id_agente_suspeito_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_qpcr` DROP FOREIGN KEY `resultado_qpcr_id_gene_alvo_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_qpcr` DROP FOREIGN KEY `resultado_qpcr_id_necropsia_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_qpcr` DROP FOREIGN KEY `resultado_qpcr_id_resultado_qpcr_fkey`;

-- DropForeignKey
ALTER TABLE `resultado_qpcr` DROP FOREIGN KEY `resultado_qpcr_id_tipo_amostra_fkey`;

-- DropForeignKey
ALTER TABLE `tutor` DROP FOREIGN KEY `tutor_id_genero_fkey`;

-- DropForeignKey
ALTER TABLE `valor_exame` DROP FOREIGN KEY `valor_exame_id_exame_fkey`;

-- DropForeignKey
ALTER TABLE `valor_exame` DROP FOREIGN KEY `valor_exame_id_interpretacao_fkey`;

-- DropForeignKey
ALTER TABLE `valor_exame` DROP FOREIGN KEY `valor_exame_id_tipo_exame_fkey`;

-- DropForeignKey
ALTER TABLE `visita_veterinaria` DROP FOREIGN KEY `visita_veterinaria_id_animal_vivo_fkey`;

-- DropForeignKey
ALTER TABLE `visita_veterinaria` DROP FOREIGN KEY `visita_veterinaria_id_veterinario_fkey`;

-- DropIndex
DROP INDEX `alocacao_amostra_necropsia_id_armazenamento_fkey` ON `alocacao_amostra_necropsia`;

-- DropIndex
DROP INDEX `alocacao_amostra_necropsia_id_necropsia_fkey` ON `alocacao_amostra_necropsia`;

-- DropIndex
DROP INDEX `alocacao_amostra_necropsia_id_status_fkey` ON `alocacao_amostra_necropsia`;

-- DropIndex
DROP INDEX `alocacao_amostra_necropsia_id_tipo_amostra_fkey` ON `alocacao_amostra_necropsia`;

-- DropIndex
DROP INDEX `alocacao_amostra_veterinario_id_armazenamento_fkey` ON `alocacao_amostra_veterinario`;

-- DropIndex
DROP INDEX `alocacao_amostra_veterinario_id_status_fkey` ON `alocacao_amostra_veterinario`;

-- DropIndex
DROP INDEX `alocacao_amostra_veterinario_id_tipo_amostra_fkey` ON `alocacao_amostra_veterinario`;

-- DropIndex
DROP INDEX `alocacao_amostra_veterinario_id_visita_veterinaria_fkey` ON `alocacao_amostra_veterinario`;

-- DropIndex
DROP INDEX `analise_ectoparasito_necropsia_id_especie_ectoparasito_fkey` ON `analise_ectoparasito_necropsia`;

-- DropIndex
DROP INDEX `analise_ectoparasito_necropsia_id_genero_ectoparasito_fkey` ON `analise_ectoparasito_necropsia`;

-- DropIndex
DROP INDEX `analise_ectoparasito_necropsia_id_necropsia_fkey` ON `analise_ectoparasito_necropsia`;

-- DropIndex
DROP INDEX `analise_ectoparasito_necropsia_id_subespecie_ectoparasito_fkey` ON `analise_ectoparasito_necropsia`;

-- DropIndex
DROP INDEX `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey` ON `analise_ectoparasito_veterinario`;

-- DropIndex
DROP INDEX `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey` ON `analise_ectoparasito_veterinario`;

-- DropIndex
DROP INDEX `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey` ON `analise_ectoparasito_veterinario`;

-- DropIndex
DROP INDEX `analise_ectoparasito_veterinario_id_visita_veterinaria_fkey` ON `analise_ectoparasito_veterinario`;

-- DropIndex
DROP INDEX `analise_fezes_id_tecnologia_processamento_fkey` ON `analise_fezes`;

-- DropIndex
DROP INDEX `analise_helminto_id_especie_helminto_fkey` ON `analise_helminto`;

-- DropIndex
DROP INDEX `analise_helminto_id_necropsia_fkey` ON `analise_helminto`;

-- DropIndex
DROP INDEX `analise_molecular_id_analise_fezes_fkey` ON `analise_molecular`;

-- DropIndex
DROP INDEX `analise_molecular_id_especie_ovo_cisto_fkey` ON `analise_molecular`;

-- DropIndex
DROP INDEX `analise_ovo_cisto_id_analise_fezes_fkey` ON `analise_ovo_cisto`;

-- DropIndex
DROP INDEX `analise_ovo_cisto_id_especie_ovo_cisto_fkey` ON `analise_ovo_cisto`;

-- DropIndex
DROP INDEX `analise_sorologica_id_agente_sorologico_fkey` ON `analise_sorologica`;

-- DropIndex
DROP INDEX `analise_sorologica_id_amostra_fkey` ON `analise_sorologica`;

-- DropIndex
DROP INDEX `analise_sorologica_id_interpretacao_fkey` ON `analise_sorologica`;

-- DropIndex
DROP INDEX `analise_sorologica_id_teste_sorologico_fkey` ON `analise_sorologica`;

-- DropIndex
DROP INDEX `analise_sorologica_id_visita_veterinaria_fkey` ON `analise_sorologica`;

-- DropIndex
DROP INDEX `animal_morto_id_especie_fkey` ON `animal_morto`;

-- DropIndex
DROP INDEX `animal_morto_id_grupo_animal_morto_fkey` ON `animal_morto`;

-- DropIndex
DROP INDEX `animal_morto_id_origem_animal_morto_fkey` ON `animal_morto`;

-- DropIndex
DROP INDEX `animal_morto_id_responsavel_coleta_fkey` ON `animal_morto`;

-- DropIndex
DROP INDEX `animal_morto_id_status_animal_morto_fkey` ON `animal_morto`;

-- DropIndex
DROP INDEX `animal_vivo_id_especie_fkey` ON `animal_vivo`;

-- DropIndex
DROP INDEX `animal_vivo_id_genero_fkey` ON `animal_vivo`;

-- DropIndex
DROP INDEX `aplicacao_vacina_id_animal_vivo_fkey` ON `aplicacao_vacina`;

-- DropIndex
DROP INDEX `aplicacao_vacina_id_tipo_vacina_fkey` ON `aplicacao_vacina`;

-- DropIndex
DROP INDEX `aplicacao_vacina_id_vacina_fkey` ON `aplicacao_vacina`;

-- DropIndex
DROP INDEX `aplicacao_vacina_id_visita_veterinaria_fkey` ON `aplicacao_vacina`;

-- DropIndex
DROP INDEX `exame_id_estado_geral_fkey` ON `exame`;

-- DropIndex
DROP INDEX `exame_id_interpretacao_fkey` ON `exame`;

-- DropIndex
DROP INDEX `exame_fisico_id_estado_geral_fkey` ON `exame_fisico`;

-- DropIndex
DROP INDEX `exame_fisico_id_hidratacao_fkey` ON `exame_fisico`;

-- DropIndex
DROP INDEX `exame_fisico_id_mucosa_fkey` ON `exame_fisico`;

-- DropIndex
DROP INDEX `medida_corporal_necropsia_id_necropsia_fkey` ON `medida_corporal_necropsia`;

-- DropIndex
DROP INDEX `medida_corporal_necropsia_id_tipo_medida_corporal_fkey` ON `medida_corporal_necropsia`;

-- DropIndex
DROP INDEX `medida_corporal_veterinario_id_tipo_medida_corporal_fkey` ON `medida_corporal_veterinario`;

-- DropIndex
DROP INDEX `medida_corporal_veterinario_id_visita_veterinaria_fkey` ON `medida_corporal_veterinario`;

-- DropIndex
DROP INDEX `necropsia_id_condicao_reprodutiva_fkey` ON `necropsia`;

-- DropIndex
DROP INDEX `necropsia_id_estado_clinico_fkey` ON `necropsia`;

-- DropIndex
DROP INDEX `necropsia_id_estado_corporal_fkey` ON `necropsia`;

-- DropIndex
DROP INDEX `necropsia_id_faixa_etaria_fkey` ON `necropsia`;

-- DropIndex
DROP INDEX `necropsia_id_tutor_fkey` ON `necropsia`;

-- DropIndex
DROP INDEX `opcao_resposta_animal_id_pergunta_animal_fkey` ON `opcao_resposta_animal`;

-- DropIndex
DROP INDEX `opcao_resposta_tutor_id_pergunta_tutor_fkey` ON `opcao_resposta_tutor`;

-- DropIndex
DROP INDEX `rastreio_gps_id_dispositivo_rastreio_fkey` ON `rastreio_gps`;

-- DropIndex
DROP INDEX `rastreio_gps_id_metodo_monitoramento_fkey` ON `rastreio_gps`;

-- DropIndex
DROP INDEX `resposta_animal_id_entrevista_animal_fkey` ON `resposta_animal`;

-- DropIndex
DROP INDEX `resposta_animal_id_opcao_resposta_animal_fkey` ON `resposta_animal`;

-- DropIndex
DROP INDEX `resposta_animal_id_pergunta_animal_fkey` ON `resposta_animal`;

-- DropIndex
DROP INDEX `resposta_tutor_id_entrevista_tutor_fkey` ON `resposta_tutor`;

-- DropIndex
DROP INDEX `resposta_tutor_id_opcao_resposta_tutor_fkey` ON `resposta_tutor`;

-- DropIndex
DROP INDEX `resposta_tutor_id_pergunta_tutor_fkey` ON `resposta_tutor`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_agente_suspeito_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_gene_alvo_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_metodo_cpcr_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_necropsia_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_resultado_cpcr_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_tipo_amostra_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_cpcr_id_tipo_extracao_fkey` ON `resultado_cpcr`;

-- DropIndex
DROP INDEX `resultado_qpcr_id_agente_suspeito_fkey` ON `resultado_qpcr`;

-- DropIndex
DROP INDEX `resultado_qpcr_id_gene_alvo_fkey` ON `resultado_qpcr`;

-- DropIndex
DROP INDEX `resultado_qpcr_id_necropsia_fkey` ON `resultado_qpcr`;

-- DropIndex
DROP INDEX `resultado_qpcr_id_resultado_qpcr_fkey` ON `resultado_qpcr`;

-- DropIndex
DROP INDEX `resultado_qpcr_id_tipo_amostra_fkey` ON `resultado_qpcr`;

-- DropIndex
DROP INDEX `tutor_id_genero_fkey` ON `tutor`;

-- DropIndex
DROP INDEX `valor_exame_id_exame_fkey` ON `valor_exame`;

-- DropIndex
DROP INDEX `valor_exame_id_interpretacao_fkey` ON `valor_exame`;

-- DropIndex
DROP INDEX `valor_exame_id_tipo_exame_fkey` ON `valor_exame`;

-- DropIndex
DROP INDEX `visita_veterinaria_id_animal_vivo_fkey` ON `visita_veterinaria`;

-- DropIndex
DROP INDEX `visita_veterinaria_id_veterinario_fkey` ON `visita_veterinaria`;

-- AlterTable
ALTER TABLE `agente_sorologico` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `agente_suspeito` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `alocacao_amostra_necropsia` DROP PRIMARY KEY,
    DROP COLUMN `data_envio`,
    ADD COLUMN `quantidade` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_necropsia` INTEGER NOT NULL,
    MODIFY `id_tipo_amostra` INTEGER NOT NULL,
    MODIFY `id_armazenamento` INTEGER NOT NULL,
    MODIFY `id_status` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `alocacao_amostra_veterinario` DROP PRIMARY KEY,
    DROP COLUMN `data_envio`,
    ADD COLUMN `quantidade` INTEGER NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_tipo_amostra` INTEGER NOT NULL,
    MODIFY `id_armazenamento` INTEGER NOT NULL,
    MODIFY `id_status` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_ectoparasito_necropsia` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_necropsia` INTEGER NOT NULL,
    MODIFY `id_genero_ectoparasito` INTEGER NOT NULL,
    MODIFY `id_especie_ectoparasito` INTEGER NOT NULL,
    MODIFY `id_subespecie_ectoparasito` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_ectoparasito_veterinario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_genero_ectoparasito` INTEGER NOT NULL,
    MODIFY `id_especie_ectoparasito` INTEGER NOT NULL,
    MODIFY `id_subespecie_ectoparasito` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_fezes` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_tecnologia_processamento` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_helminto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_necropsia` INTEGER NOT NULL,
    MODIFY `id_especie_helminto` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_molecular` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_analise_fezes` INTEGER NOT NULL,
    MODIFY `id_especie_ovo_cisto` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_ovo_cisto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_analise_fezes` INTEGER NOT NULL,
    MODIFY `id_especie_ovo_cisto` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `analise_sorologica` DROP PRIMARY KEY,
    DROP COLUMN `id_amostra`,
    DROP COLUMN `ponto_corte`,
    ADD COLUMN `id_tipo_resultado` INTEGER NOT NULL,
    ADD COLUMN `simbolo_ponto_corte` VARCHAR(191) NOT NULL,
    ADD COLUMN `valor_ponto_corte` VARCHAR(191) NOT NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_teste_sorologico` INTEGER NOT NULL,
    MODIFY `id_agente_sorologico` INTEGER NOT NULL,
    MODIFY `id_interpretacao` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `animal_morto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_grupo_animal_morto` INTEGER NOT NULL,
    MODIFY `id_especie` INTEGER NOT NULL,
    MODIFY `id_origem_animal_morto` INTEGER NOT NULL,
    MODIFY `id_status_animal_morto` INTEGER NOT NULL,
    MODIFY `id_responsavel_coleta` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `animal_vivo` DROP PRIMARY KEY,
    ADD COLUMN `foto_animal` VARCHAR(191) NULL,
    ADD COLUMN `link_carteirinha` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_especie` INTEGER NOT NULL,
    MODIFY `id_genero` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `aplicacao_vacina` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_animal_vivo` INTEGER NOT NULL,
    MODIFY `id_vacina` INTEGER NOT NULL,
    MODIFY `id_visita_veterinaria` INTEGER NULL,
    MODIFY `id_tipo_vacina` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `armazem` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `castracao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_animal_vivo` INTEGER NOT NULL,
    MODIFY `id_visita_veterinaria` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `dispositivo_rastreio` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `entrevista_animal` DROP PRIMARY KEY,
    ADD COLUMN `id_entrevista_tutor` INTEGER NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_animal_vivo` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `entrevista_tutor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_tutor` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_condicao_reprodutiva` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_estado_clinico` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_estado_corporal` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_estado_geral` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_estado_geral_exame_fisico` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_faixa_etaria` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_genero` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_genero_animal` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_hidratacao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_interpretacao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_interpretacao_analise_sorologica` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_interpretacao_valor_exame` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_metodo_cpcr` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_mucosa` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_origem_animal_morto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_status_animal_morto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_status_cpcr` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_status_qpcr` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `enum_tipo_vacina` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `especie` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `especie_ectoparasito` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `especie_helminto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `especie_ovo_cisto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `exame` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_estado_geral` INTEGER NOT NULL,
    MODIFY `id_interpretacao` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `exame_fisico` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_estado_geral` INTEGER NOT NULL,
    MODIFY `id_mucosa` INTEGER NOT NULL,
    MODIFY `id_hidratacao` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `gene_alvo` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `genero_ectoparasito` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `grupo_animal_morto` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `medida_corporal_necropsia` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_necropsia` INTEGER NOT NULL,
    MODIFY `id_tipo_medida_corporal` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `medida_corporal_veterinario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_visita_veterinaria` INTEGER NOT NULL,
    MODIFY `id_tipo_medida_corporal` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `metodo_monitoramento` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `necropsia` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_animal_morto` INTEGER NOT NULL,
    MODIFY `id_estado_corporal` INTEGER NOT NULL,
    MODIFY `id_estado_clinico` INTEGER NOT NULL,
    MODIFY `id_tutor` INTEGER NULL,
    MODIFY `id_condicao_reprodutiva` INTEGER NOT NULL,
    MODIFY `id_faixa_etaria` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `opcao_resposta_animal` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_pergunta_animal` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `opcao_resposta_tutor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_pergunta_tutor` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pergunta_animal` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `pergunta_tutor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `rastreio_gps` DROP PRIMARY KEY,
    ADD COLUMN `data_atualizacao_planilha_bruta` DATETIME(3) NULL,
    ADD COLUMN `data_atualizacao_planilha_editada` DATETIME(3) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_animal_vivo` INTEGER NOT NULL,
    MODIFY `id_dispositivo_rastreio` INTEGER NOT NULL,
    MODIFY `id_metodo_monitoramento` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `responsavel_coleta` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `resposta_animal` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_entrevista_animal` INTEGER NOT NULL,
    MODIFY `id_pergunta_animal` INTEGER NOT NULL,
    MODIFY `id_opcao_resposta_animal` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `resposta_tutor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_entrevista_tutor` INTEGER NOT NULL,
    MODIFY `id_pergunta_tutor` INTEGER NOT NULL,
    MODIFY `id_opcao_resposta_tutor` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `resultado_cpcr` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_necropsia` INTEGER NOT NULL,
    MODIFY `id_tipo_amostra` INTEGER NOT NULL,
    MODIFY `id_tipo_extracao` INTEGER NOT NULL,
    MODIFY `id_gene_alvo` INTEGER NOT NULL,
    MODIFY `id_agente_suspeito` INTEGER NOT NULL,
    MODIFY `id_metodo_cpcr` INTEGER NOT NULL,
    MODIFY `id_resultado_cpcr` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `resultado_qpcr` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_necropsia` INTEGER NOT NULL,
    MODIFY `id_tipo_amostra` INTEGER NOT NULL,
    MODIFY `id_gene_alvo` INTEGER NOT NULL,
    MODIFY `id_agente_suspeito` INTEGER NOT NULL,
    MODIFY `id_resultado_qpcr` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tecnologia_processamento` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `teste_sorologico` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tipo_exame` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tipo_extracao` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tipo_medida_corporal_necropsia` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tipo_medida_corporal_veterinario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `tutor` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_genero` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `vacina` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `valor_exame` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_exame` INTEGER NOT NULL,
    MODIFY `id_tipo_exame` INTEGER NOT NULL,
    MODIFY `id_interpretacao` INTEGER NULL,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `veterinario` DROP PRIMARY KEY,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    ADD PRIMARY KEY (`id`);

-- AlterTable
ALTER TABLE `visita_veterinaria` DROP PRIMARY KEY,
    DROP COLUMN `link_carteirinha`,
    ADD COLUMN `foto_animal` VARCHAR(191) NULL,
    ADD COLUMN `observacao` VARCHAR(191) NULL,
    MODIFY `id` INTEGER NOT NULL AUTO_INCREMENT,
    MODIFY `id_animal_vivo` INTEGER NOT NULL,
    MODIFY `id_veterinario` INTEGER NOT NULL,
    ADD PRIMARY KEY (`id`);

-- DropTable
DROP TABLE `enum_status_alocacao_amostra`;

-- DropTable
DROP TABLE `tipo_amostra`;

-- CreateTable
CREATE TABLE `token_redefinicao_senha` (
    `id` VARCHAR(191) NOT NULL,
    `id_usuario` VARCHAR(191) NOT NULL,
    `token` VARCHAR(191) NOT NULL,
    `expira_em` DATETIME(3) NOT NULL,
    `utilizado` BOOLEAN NOT NULL DEFAULT false,
    `criado_em` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `token_redefinicao_senha_token_key`(`token`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `resultado_exame` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_visita_veterinaria` INTEGER NOT NULL,
    `eritrocitos` DOUBLE NOT NULL,
    `hemoglobina` DOUBLE NOT NULL,
    `hematocrito` DOUBLE NOT NULL,
    `vcm` DOUBLE NOT NULL,
    `hcm` DOUBLE NOT NULL,
    `chcm` DOUBLE NOT NULL,
    `plaquetas` DOUBLE NOT NULL,
    `leucocitos` DOUBLE NOT NULL,
    `bastonetes` DOUBLE NOT NULL,
    `segmentados` DOUBLE NOT NULL,
    `segmentados_percentual` DOUBLE NOT NULL,
    `linfocitos` DOUBLE NOT NULL,
    `linfocitos_percentual` DOUBLE NOT NULL,
    `monocitos` DOUBLE NOT NULL,
    `monocitos_percentual` DOUBLE NOT NULL,
    `eosinofilos` DOUBLE NOT NULL,
    `eosinofilos_percentual` DOUBLE NOT NULL,
    `basofilos` DOUBLE NOT NULL,
    `basofilos_percentual` DOUBLE NOT NULL,
    `alt` DOUBLE NOT NULL,
    `creatinina` DOUBLE NOT NULL,
    `fosfatase_alcalina` DOUBLE NOT NULL,
    `proteina_total` DOUBLE NOT NULL,
    `ureia` DOUBLE NOT NULL,

    UNIQUE INDEX `resultado_exame_id_visita_veterinaria_key`(`id_visita_veterinaria`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enum_tipo_resultado_analise_sorologica` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `envio_amostra_veterinario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_alocacao_amostra_veterinario` INTEGER NOT NULL,
    `id_armazenamento` INTEGER NOT NULL,
    `id_status` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `data_envio` DATETIME(3) NOT NULL,
    `observacao` VARCHAR(191) NULL,

    UNIQUE INDEX `envio_amostra_veterinario_id_alocacao_amostra_veterinario_id_key`(`id_alocacao_amostra_veterinario`, `id_armazenamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enum_status_alocacao_amostra_veterinario` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `enum_status_alocacao_amostra_necropsia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_amostra_veterinaria` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_amostra_necropsia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `envio_amostra_necropsia` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `id_alocacao_amostra_necropsia` INTEGER NOT NULL,
    `id_armazenamento` INTEGER NOT NULL,
    `id_status` INTEGER NOT NULL,
    `quantidade` INTEGER NOT NULL,
    `data_envio` DATETIME(3) NOT NULL,
    `observacao` VARCHAR(191) NULL,

    UNIQUE INDEX `envio_amostra_necropsia_id_alocacao_amostra_necropsia_id_arm_key`(`id_alocacao_amostra_necropsia`, `id_armazenamento`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_amostra_cpcr` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tipo_amostra_qpcr` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `descricao` VARCHAR(191) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `alocacao_amostra_necropsia_id_necropsia_id_tipo_amostra_key` ON `alocacao_amostra_necropsia`(`id_necropsia`, `id_tipo_amostra`);

-- CreateIndex
CREATE UNIQUE INDEX `alocacao_amostra_veterinario_id_visita_veterinaria_id_tipo_a_key` ON `alocacao_amostra_veterinario`(`id_visita_veterinaria`, `id_tipo_amostra`);

-- CreateIndex
CREATE UNIQUE INDEX `analise_ectoparasito_necropsia_id_necropsia_id_genero_ectopa_key` ON `analise_ectoparasito_necropsia`(`id_necropsia`, `id_genero_ectoparasito`, `id_especie_ectoparasito`, `id_subespecie_ectoparasito`);

-- CreateIndex
CREATE UNIQUE INDEX `analise_ectoparasito_veterinario_id_visita_veterinaria_id_ge_key` ON `analise_ectoparasito_veterinario`(`id_visita_veterinaria`, `id_genero_ectoparasito`, `id_especie_ectoparasito`, `id_subespecie_ectoparasito`);

-- CreateIndex
CREATE UNIQUE INDEX `analise_molecular_id_analise_fezes_id_especie_ovo_cisto_key` ON `analise_molecular`(`id_analise_fezes`, `id_especie_ovo_cisto`);

-- CreateIndex
CREATE UNIQUE INDEX `analise_ovo_cisto_id_analise_fezes_id_especie_ovo_cisto_key` ON `analise_ovo_cisto`(`id_analise_fezes`, `id_especie_ovo_cisto`);

-- CreateIndex
CREATE UNIQUE INDEX `analise_sorologica_id_visita_veterinaria_key` ON `analise_sorologica`(`id_visita_veterinaria`);

-- CreateIndex
CREATE UNIQUE INDEX `medida_corporal_necropsia_id_necropsia_id_tipo_medida_corpor_key` ON `medida_corporal_necropsia`(`id_necropsia`, `id_tipo_medida_corporal`);

-- CreateIndex
CREATE UNIQUE INDEX `medida_corporal_veterinario_id_visita_veterinaria_id_tipo_me_key` ON `medida_corporal_veterinario`(`id_visita_veterinaria`, `id_tipo_medida_corporal`);

-- CreateIndex
CREATE UNIQUE INDEX `pergunta_animal_pergunta_key` ON `pergunta_animal`(`pergunta`);

-- CreateIndex
CREATE UNIQUE INDEX `pergunta_tutor_pergunta_key` ON `pergunta_tutor`(`pergunta`);

-- CreateIndex
CREATE UNIQUE INDEX `visita_veterinaria_id_animal_vivo_id_veterinario_data_key` ON `visita_veterinaria`(`id_animal_vivo`, `id_veterinario`, `data`);

-- AddForeignKey
ALTER TABLE `token_redefinicao_senha` ADD CONSTRAINT `token_redefinicao_senha_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_vivo` ADD CONSTRAINT `animal_vivo_id_especie_fkey` FOREIGN KEY (`id_especie`) REFERENCES `especie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_vivo` ADD CONSTRAINT `animal_vivo_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `enum_genero_animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rastreio_gps` ADD CONSTRAINT `rastreio_gps_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rastreio_gps` ADD CONSTRAINT `rastreio_gps_id_dispositivo_rastreio_fkey` FOREIGN KEY (`id_dispositivo_rastreio`) REFERENCES `dispositivo_rastreio`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `rastreio_gps` ADD CONSTRAINT `rastreio_gps_id_metodo_monitoramento_fkey` FOREIGN KEY (`id_metodo_monitoramento`) REFERENCES `metodo_monitoramento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entrevista_animal` ADD CONSTRAINT `entrevista_animal_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entrevista_animal` ADD CONSTRAINT `entrevista_animal_id_entrevista_tutor_fkey` FOREIGN KEY (`id_entrevista_tutor`) REFERENCES `entrevista_tutor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta_animal` ADD CONSTRAINT `resposta_animal_id_entrevista_animal_fkey` FOREIGN KEY (`id_entrevista_animal`) REFERENCES `entrevista_animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta_animal` ADD CONSTRAINT `resposta_animal_id_pergunta_animal_fkey` FOREIGN KEY (`id_pergunta_animal`) REFERENCES `pergunta_animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta_animal` ADD CONSTRAINT `resposta_animal_id_opcao_resposta_animal_fkey` FOREIGN KEY (`id_opcao_resposta_animal`) REFERENCES `opcao_resposta_animal`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcao_resposta_animal` ADD CONSTRAINT `opcao_resposta_animal_id_pergunta_animal_fkey` FOREIGN KEY (`id_pergunta_animal`) REFERENCES `pergunta_animal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entrevista_tutor` ADD CONSTRAINT `entrevista_tutor_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tutor` ADD CONSTRAINT `tutor_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `enum_genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta_tutor` ADD CONSTRAINT `resposta_tutor_id_entrevista_tutor_fkey` FOREIGN KEY (`id_entrevista_tutor`) REFERENCES `entrevista_tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta_tutor` ADD CONSTRAINT `resposta_tutor_id_pergunta_tutor_fkey` FOREIGN KEY (`id_pergunta_tutor`) REFERENCES `pergunta_tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resposta_tutor` ADD CONSTRAINT `resposta_tutor_id_opcao_resposta_tutor_fkey` FOREIGN KEY (`id_opcao_resposta_tutor`) REFERENCES `opcao_resposta_tutor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `opcao_resposta_tutor` ADD CONSTRAINT `opcao_resposta_tutor_id_pergunta_tutor_fkey` FOREIGN KEY (`id_pergunta_tutor`) REFERENCES `pergunta_tutor`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `castracao` ADD CONSTRAINT `castracao_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `castracao` ADD CONSTRAINT `castracao_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visita_veterinaria` ADD CONSTRAINT `visita_veterinaria_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `visita_veterinaria` ADD CONSTRAINT `visita_veterinaria_id_veterinario_fkey` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aplicacao_vacina` ADD CONSTRAINT `aplicacao_vacina_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aplicacao_vacina` ADD CONSTRAINT `aplicacao_vacina_id_vacina_fkey` FOREIGN KEY (`id_vacina`) REFERENCES `vacina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aplicacao_vacina` ADD CONSTRAINT `aplicacao_vacina_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `aplicacao_vacina` ADD CONSTRAINT `aplicacao_vacina_id_tipo_vacina_fkey` FOREIGN KEY (`id_tipo_vacina`) REFERENCES `enum_tipo_vacina`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame` ADD CONSTRAINT `exame_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame` ADD CONSTRAINT `exame_id_estado_geral_fkey` FOREIGN KEY (`id_estado_geral`) REFERENCES `enum_estado_geral`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame` ADD CONSTRAINT `exame_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valor_exame` ADD CONSTRAINT `valor_exame_id_exame_fkey` FOREIGN KEY (`id_exame`) REFERENCES `exame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valor_exame` ADD CONSTRAINT `valor_exame_id_tipo_exame_fkey` FOREIGN KEY (`id_tipo_exame`) REFERENCES `tipo_exame`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `valor_exame` ADD CONSTRAINT `valor_exame_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao_valor_exame`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_fezes` ADD CONSTRAINT `analise_fezes_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_fezes` ADD CONSTRAINT `analise_fezes_id_tecnologia_processamento_fkey` FOREIGN KEY (`id_tecnologia_processamento`) REFERENCES `tecnologia_processamento`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ovo_cisto` ADD CONSTRAINT `analise_ovo_cisto_id_analise_fezes_fkey` FOREIGN KEY (`id_analise_fezes`) REFERENCES `analise_fezes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ovo_cisto` ADD CONSTRAINT `analise_ovo_cisto_id_especie_ovo_cisto_fkey` FOREIGN KEY (`id_especie_ovo_cisto`) REFERENCES `especie_ovo_cisto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_molecular` ADD CONSTRAINT `analise_molecular_id_analise_fezes_fkey` FOREIGN KEY (`id_analise_fezes`) REFERENCES `analise_fezes`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_molecular` ADD CONSTRAINT `analise_molecular_id_especie_ovo_cisto_fkey` FOREIGN KEY (`id_especie_ovo_cisto`) REFERENCES `especie_ovo_cisto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame_fisico` ADD CONSTRAINT `exame_fisico_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame_fisico` ADD CONSTRAINT `exame_fisico_id_estado_geral_fkey` FOREIGN KEY (`id_estado_geral`) REFERENCES `enum_estado_geral_exame_fisico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame_fisico` ADD CONSTRAINT `exame_fisico_id_mucosa_fkey` FOREIGN KEY (`id_mucosa`) REFERENCES `enum_mucosa`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `exame_fisico` ADD CONSTRAINT `exame_fisico_id_hidratacao_fkey` FOREIGN KEY (`id_hidratacao`) REFERENCES `enum_hidratacao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medida_corporal_veterinario` ADD CONSTRAINT `medida_corporal_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medida_corporal_veterinario` ADD CONSTRAINT `medida_corporal_veterinario_id_tipo_medida_corporal_fkey` FOREIGN KEY (`id_tipo_medida_corporal`) REFERENCES `tipo_medida_corporal_veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` ADD CONSTRAINT `analise_ectoparasito_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` ADD CONSTRAINT `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey` FOREIGN KEY (`id_genero_ectoparasito`) REFERENCES `genero_ectoparasito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` ADD CONSTRAINT `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey` FOREIGN KEY (`id_especie_ectoparasito`) REFERENCES `especie_ectoparasito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_veterinario` ADD CONSTRAINT `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey` FOREIGN KEY (`id_subespecie_ectoparasito`) REFERENCES `especie_ectoparasito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_exame` ADD CONSTRAINT `resultado_exame_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_sorologica` ADD CONSTRAINT `analise_sorologica_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_sorologica` ADD CONSTRAINT `analise_sorologica_id_teste_sorologico_fkey` FOREIGN KEY (`id_teste_sorologico`) REFERENCES `teste_sorologico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_sorologica` ADD CONSTRAINT `analise_sorologica_id_agente_sorologico_fkey` FOREIGN KEY (`id_agente_sorologico`) REFERENCES `agente_sorologico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_sorologica` ADD CONSTRAINT `analise_sorologica_id_tipo_resultado_fkey` FOREIGN KEY (`id_tipo_resultado`) REFERENCES `enum_tipo_resultado_analise_sorologica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_sorologica` ADD CONSTRAINT `analise_sorologica_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao_analise_sorologica`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_veterinario` ADD CONSTRAINT `alocacao_amostra_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_veterinario` ADD CONSTRAINT `alocacao_amostra_veterinario_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_veterinaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_veterinario` ADD CONSTRAINT `alocacao_amostra_veterinario_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_veterinario` ADD CONSTRAINT `alocacao_amostra_veterinario_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `envio_amostra_veterinario` ADD CONSTRAINT `envio_amostra_veterinario_id_alocacao_amostra_veterinario_fkey` FOREIGN KEY (`id_alocacao_amostra_veterinario`) REFERENCES `alocacao_amostra_veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `envio_amostra_veterinario` ADD CONSTRAINT `envio_amostra_veterinario_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `envio_amostra_veterinario` ADD CONSTRAINT `envio_amostra_veterinario_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_veterinario`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_morto` ADD CONSTRAINT `animal_morto_id_grupo_animal_morto_fkey` FOREIGN KEY (`id_grupo_animal_morto`) REFERENCES `grupo_animal_morto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_morto` ADD CONSTRAINT `animal_morto_id_especie_fkey` FOREIGN KEY (`id_especie`) REFERENCES `especie`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_morto` ADD CONSTRAINT `animal_morto_id_origem_animal_morto_fkey` FOREIGN KEY (`id_origem_animal_morto`) REFERENCES `enum_origem_animal_morto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_morto` ADD CONSTRAINT `animal_morto_id_status_animal_morto_fkey` FOREIGN KEY (`id_status_animal_morto`) REFERENCES `enum_status_animal_morto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `animal_morto` ADD CONSTRAINT `animal_morto_id_responsavel_coleta_fkey` FOREIGN KEY (`id_responsavel_coleta`) REFERENCES `responsavel_coleta`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `necropsia` ADD CONSTRAINT `necropsia_id_animal_morto_fkey` FOREIGN KEY (`id_animal_morto`) REFERENCES `animal_morto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `necropsia` ADD CONSTRAINT `necropsia_id_estado_corporal_fkey` FOREIGN KEY (`id_estado_corporal`) REFERENCES `enum_estado_corporal`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `necropsia` ADD CONSTRAINT `necropsia_id_estado_clinico_fkey` FOREIGN KEY (`id_estado_clinico`) REFERENCES `enum_estado_clinico`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `necropsia` ADD CONSTRAINT `necropsia_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `tutor`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `necropsia` ADD CONSTRAINT `necropsia_id_condicao_reprodutiva_fkey` FOREIGN KEY (`id_condicao_reprodutiva`) REFERENCES `enum_condicao_reprodutiva`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `necropsia` ADD CONSTRAINT `necropsia_id_faixa_etaria_fkey` FOREIGN KEY (`id_faixa_etaria`) REFERENCES `enum_faixa_etaria`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medida_corporal_necropsia` ADD CONSTRAINT `medida_corporal_necropsia_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `medida_corporal_necropsia` ADD CONSTRAINT `medida_corporal_necropsia_id_tipo_medida_corporal_fkey` FOREIGN KEY (`id_tipo_medida_corporal`) REFERENCES `tipo_medida_corporal_necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_helminto` ADD CONSTRAINT `analise_helminto_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_helminto` ADD CONSTRAINT `analise_helminto_id_especie_helminto_fkey` FOREIGN KEY (`id_especie_helminto`) REFERENCES `especie_helminto`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` ADD CONSTRAINT `analise_ectoparasito_necropsia_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` ADD CONSTRAINT `analise_ectoparasito_necropsia_id_genero_ectoparasito_fkey` FOREIGN KEY (`id_genero_ectoparasito`) REFERENCES `genero_ectoparasito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` ADD CONSTRAINT `analise_ectoparasito_necropsia_id_especie_ectoparasito_fkey` FOREIGN KEY (`id_especie_ectoparasito`) REFERENCES `especie_ectoparasito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `analise_ectoparasito_necropsia` ADD CONSTRAINT `analise_ectoparasito_necropsia_id_subespecie_ectoparasito_fkey` FOREIGN KEY (`id_subespecie_ectoparasito`) REFERENCES `especie_ectoparasito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_necropsia` ADD CONSTRAINT `alocacao_amostra_necropsia_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_necropsia` ADD CONSTRAINT `alocacao_amostra_necropsia_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_necropsia` ADD CONSTRAINT `alocacao_amostra_necropsia_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `alocacao_amostra_necropsia` ADD CONSTRAINT `alocacao_amostra_necropsia_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `envio_amostra_necropsia` ADD CONSTRAINT `envio_amostra_necropsia_id_alocacao_amostra_necropsia_fkey` FOREIGN KEY (`id_alocacao_amostra_necropsia`) REFERENCES `alocacao_amostra_necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `envio_amostra_necropsia` ADD CONSTRAINT `envio_amostra_necropsia_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `envio_amostra_necropsia` ADD CONSTRAINT `envio_amostra_necropsia_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_cpcr`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_tipo_extracao_fkey` FOREIGN KEY (`id_tipo_extracao`) REFERENCES `tipo_extracao`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_gene_alvo_fkey` FOREIGN KEY (`id_gene_alvo`) REFERENCES `gene_alvo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_agente_suspeito_fkey` FOREIGN KEY (`id_agente_suspeito`) REFERENCES `agente_suspeito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_metodo_cpcr_fkey` FOREIGN KEY (`id_metodo_cpcr`) REFERENCES `enum_metodo_cpcr`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_cpcr` ADD CONSTRAINT `resultado_cpcr_id_resultado_cpcr_fkey` FOREIGN KEY (`id_resultado_cpcr`) REFERENCES `enum_status_cpcr`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_qpcr` ADD CONSTRAINT `resultado_qpcr_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_qpcr` ADD CONSTRAINT `resultado_qpcr_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_qpcr`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_qpcr` ADD CONSTRAINT `resultado_qpcr_id_gene_alvo_fkey` FOREIGN KEY (`id_gene_alvo`) REFERENCES `gene_alvo`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_qpcr` ADD CONSTRAINT `resultado_qpcr_id_agente_suspeito_fkey` FOREIGN KEY (`id_agente_suspeito`) REFERENCES `agente_suspeito`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `resultado_qpcr` ADD CONSTRAINT `resultado_qpcr_id_resultado_qpcr_fkey` FOREIGN KEY (`id_resultado_qpcr`) REFERENCES `enum_status_qpcr`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
