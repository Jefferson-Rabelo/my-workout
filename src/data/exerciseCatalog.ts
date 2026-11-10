import type { CatalogExercise } from '../types/exerciseCatalog'

// Sugestões gerais para referência; não substituem orientação individual.
export const exerciseCatalog: CatalogExercise[] = [
  {
    id: 'supino-reto', name: 'Supino reto', primaryMuscleGroup: 'chest', secondaryMuscleGroups: ['triceps', 'shoulders'], category: 'compound', equipment: ['Barra', 'Banco reto'],
    instructions: ['Deite no banco e segure a barra um pouco além da largura dos ombros.', 'Desça a barra com controle até próximo ao peito.', 'Empurre a barra para cima sem travar os cotovelos.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'supino-inclinado', name: 'Supino inclinado', primaryMuscleGroup: 'chest', secondaryMuscleGroups: ['triceps', 'shoulders'], category: 'compound', equipment: ['Barra', 'Banco inclinado'],
    instructions: ['Ajuste o banco em inclinação moderada e apoie os pés no chão.', 'Desça a barra em direção à parte superior do peito.', 'Empurre para cima mantendo os ombros apoiados.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'crucifixo-com-halteres', name: 'Crucifixo com halteres', primaryMuscleGroup: 'chest', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Halteres', 'Banco reto'],
    instructions: ['Deite no banco com os halteres acima do peito e cotovelos levemente flexionados.', 'Abra os braços em arco até sentir alongamento confortável.', 'Aproxime os halteres de volta sem alterar a flexão dos cotovelos.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'crossover-na-polia', name: 'Crossover na polia', primaryMuscleGroup: 'chest', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de cabos'],
    instructions: ['Posicione as polias na altura dos ombros e dê um passo à frente.', 'Traga as mãos em arco à frente do corpo.', 'Retorne devagar até alongar o peito sem perder a postura.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'flexao-de-bracos', name: 'Flexão de braços', primaryMuscleGroup: 'chest', secondaryMuscleGroups: ['triceps', 'shoulders'], category: 'compound', equipment: ['Peso corporal'],
    instructions: ['Apoie mãos e pés no chão, mantendo o corpo alinhado.', 'Flexione os cotovelos e aproxime o peito do chão.', 'Empurre o chão para voltar à posição inicial.'], suggestedSets: 3, suggestedReps: '8-15',
  },
  {
    id: 'puxada-frontal', name: 'Puxada frontal', primaryMuscleGroup: 'back', secondaryMuscleGroups: ['biceps'], category: 'compound', equipment: ['Máquina de puxada'],
    instructions: ['Sente-se e segure a barra com as mãos um pouco além dos ombros.', 'Puxe a barra em direção à parte superior do peito.', 'Estenda os braços com controle até a posição inicial.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'remada-curvada', name: 'Remada curvada', primaryMuscleGroup: 'back', secondaryMuscleGroups: ['biceps', 'shoulders'], category: 'compound', equipment: ['Barra'],
    instructions: ['Incline o tronco com as costas neutras e segure a barra.', 'Puxe a barra em direção ao abdômen, aproximando as escápulas.', 'Estenda os braços devagar sem arredondar as costas.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'remada-baixa', name: 'Remada baixa', primaryMuscleGroup: 'back', secondaryMuscleGroups: ['biceps'], category: 'compound', equipment: ['Máquina de cabos', 'Puxador'],
    instructions: ['Sente-se com o tronco ereto e segure o puxador.', 'Puxe em direção ao abdômen mantendo os cotovelos próximos ao corpo.', 'Estenda os braços lentamente sem balançar o tronco.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'barra-fixa', name: 'Barra fixa', primaryMuscleGroup: 'back', secondaryMuscleGroups: ['biceps'], category: 'compound', equipment: ['Barra fixa', 'Peso corporal'],
    instructions: ['Segure a barra com as mãos um pouco além dos ombros.', 'Puxe o corpo para cima até o queixo se aproximar da barra.', 'Desça com controle até estender os braços.'], suggestedSets: 3, suggestedReps: '6-10',
  },
  {
    id: 'remada-unilateral-com-halter', name: 'Remada unilateral com halter', primaryMuscleGroup: 'back', secondaryMuscleGroups: ['biceps'], category: 'compound', equipment: ['Halter', 'Banco'],
    instructions: ['Apoie uma mão e um joelho no banco, mantendo as costas neutras.', 'Puxe o halter em direção ao quadril.', 'Desça o halter com controle e repita do outro lado.'], suggestedSets: 3, suggestedReps: '8-12 por lado',
  },
  {
    id: 'desenvolvimento-com-halteres', name: 'Desenvolvimento com halteres', primaryMuscleGroup: 'shoulders', secondaryMuscleGroups: ['triceps'], category: 'compound', equipment: ['Halteres', 'Banco com encosto'],
    instructions: ['Sente-se com as costas apoiadas e halteres na altura dos ombros.', 'Empurre os halteres para cima mantendo o tronco firme.', 'Desça devagar até a posição inicial.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'elevacao-lateral', name: 'Elevação lateral', primaryMuscleGroup: 'shoulders', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Halteres'],
    instructions: ['Fique em pé com halteres ao lado do corpo e cotovelos suaves.', 'Eleve os braços lateralmente até a altura dos ombros.', 'Abaixe devagar sem balançar o tronco.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'elevacao-frontal', name: 'Elevação frontal', primaryMuscleGroup: 'shoulders', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Halteres'],
    instructions: ['Segure os halteres à frente das coxas com postura estável.', 'Eleve um ou ambos os braços à frente até a altura dos ombros.', 'Retorne devagar sem usar impulso.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'face-pull', name: 'Face pull', primaryMuscleGroup: 'shoulders', secondaryMuscleGroups: ['back'], category: 'isolation', equipment: ['Máquina de cabos', 'Corda'],
    instructions: ['Ajuste a polia na altura do rosto e segure a corda.', 'Puxe em direção ao rosto, abrindo as mãos para os lados.', 'Retorne com controle mantendo os ombros baixos.'], suggestedSets: 3, suggestedReps: '12-15',
  },
  {
    id: 'encolhimento-de-ombros', name: 'Encolhimento de ombros', primaryMuscleGroup: 'shoulders', secondaryMuscleGroups: ['forearms'], category: 'isolation', equipment: ['Halteres'],
    instructions: ['Fique em pé segurando os halteres ao lado do corpo.', 'Eleve os ombros em direção às orelhas sem girá-los.', 'Abaixe lentamente até a posição inicial.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'rosca-direta', name: 'Rosca direta', primaryMuscleGroup: 'biceps', secondaryMuscleGroups: ['forearms'], category: 'isolation', equipment: ['Barra'],
    instructions: ['Segure a barra com as palmas voltadas para cima e cotovelos junto ao tronco.', 'Flexione os cotovelos para elevar a barra.', 'Desça lentamente sem balançar o corpo.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'rosca-alternada', name: 'Rosca alternada', primaryMuscleGroup: 'biceps', secondaryMuscleGroups: ['forearms'], category: 'isolation', equipment: ['Halteres'],
    instructions: ['Fique em pé segurando um halter em cada mão.', 'Flexione um cotovelo de cada vez, girando a palma para cima.', 'Desça com controle e alterne os braços.'], suggestedSets: 3, suggestedReps: '8-12 por lado',
  },
  {
    id: 'rosca-martelo', name: 'Rosca martelo', primaryMuscleGroup: 'biceps', secondaryMuscleGroups: ['forearms'], category: 'isolation', equipment: ['Halteres'],
    instructions: ['Segure os halteres com as palmas voltadas uma para a outra.', 'Flexione os cotovelos mantendo essa pegada neutra.', 'Desça devagar sem mover os ombros.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'rosca-concentrada', name: 'Rosca concentrada', primaryMuscleGroup: 'biceps', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Halter'],
    instructions: ['Sente-se e apoie o cotovelo na parte interna da coxa.', 'Flexione o cotovelo elevando o halter em direção ao ombro.', 'Estenda o braço lentamente e repita.'], suggestedSets: 3, suggestedReps: '10-12 por lado',
  },
  {
    id: 'triceps-pulley', name: 'Tríceps pulley', primaryMuscleGroup: 'triceps', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de cabos', 'Barra reta'],
    instructions: ['Fique de frente para a polia com os cotovelos junto ao tronco.', 'Estenda os cotovelos empurrando o puxador para baixo.', 'Retorne devagar sem afastar os cotovelos do corpo.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'triceps-frances-com-halter', name: 'Tríceps francês com halter', primaryMuscleGroup: 'triceps', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Halter'],
    instructions: ['Segure um halter acima da cabeça com os braços estendidos.', 'Flexione os cotovelos levando o halter atrás da cabeça.', 'Estenda os braços sem abrir excessivamente os cotovelos.'], suggestedSets: 3, suggestedReps: '10-12',
  },
  {
    id: 'triceps-testa', name: 'Tríceps testa', primaryMuscleGroup: 'triceps', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Barra', 'Banco reto'],
    instructions: ['Deite no banco e segure a barra acima do peito.', 'Flexione os cotovelos levando a barra em direção à testa.', 'Estenda os cotovelos para voltar sem mover os braços.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'triceps-coice-na-polia', name: 'Tríceps coice na polia', primaryMuscleGroup: 'triceps', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de cabos', 'Puxador individual'],
    instructions: ['Fique de frente para a polia baixa e incline levemente o tronco.', 'Mantenha o cotovelo junto ao corpo e estenda o antebraço para trás.', 'Flexione devagar para retornar.'], suggestedSets: 3, suggestedReps: '10-15 por lado',
  },
  {
    id: 'rosca-de-punho', name: 'Rosca de punho', primaryMuscleGroup: 'forearms', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Halteres', 'Banco'],
    instructions: ['Sente-se e apoie os antebraços nas coxas com as palmas para cima.', 'Flexione os punhos elevando os halteres.', 'Abaixe devagar mantendo os antebraços apoiados.'], suggestedSets: 3, suggestedReps: '12-15',
  },
  {
    id: 'rosca-inversa', name: 'Rosca inversa', primaryMuscleGroup: 'forearms', secondaryMuscleGroups: ['biceps'], category: 'isolation', equipment: ['Barra'],
    instructions: ['Segure a barra com as palmas voltadas para baixo.', 'Flexione os cotovelos elevando a barra sem mover os braços.', 'Desça com controle até estender os cotovelos.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'carregada-do-fazendeiro', name: 'Caminhada do fazendeiro', primaryMuscleGroup: 'forearms', secondaryMuscleGroups: ['shoulders'], category: 'compound', equipment: ['Halteres'],
    instructions: ['Segure um halter pesado em cada mão e fique ereto.', 'Caminhe em passos controlados mantendo os ombros estáveis.', 'Pouse os halteres com cuidado ao terminar o percurso.'], suggestedSets: 3, suggestedReps: '20-40 m',
  },
  {
    id: 'agachamento-livre', name: 'Agachamento livre', primaryMuscleGroup: 'quadriceps', secondaryMuscleGroups: ['glutes', 'hamstrings'], category: 'compound', equipment: ['Barra', 'Suporte para agachamento'],
    instructions: ['Posicione a barra com segurança e fique com os pés na largura confortável.', 'Flexione quadris e joelhos, mantendo o tronco firme.', 'Empurre o chão e estenda as pernas para ficar em pé.'], suggestedSets: 3, suggestedReps: '6-10',
  },
  {
    id: 'leg-press', name: 'Leg press', primaryMuscleGroup: 'quadriceps', secondaryMuscleGroups: ['glutes', 'hamstrings'], category: 'compound', equipment: ['Máquina leg press'],
    instructions: ['Sente-se e apoie os pés na plataforma na largura dos ombros.', 'Desça a plataforma até uma amplitude confortável sem arredondar a lombar.', 'Empurre a plataforma sem travar os joelhos.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'cadeira-extensora', name: 'Cadeira extensora', primaryMuscleGroup: 'quadriceps', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Cadeira extensora'],
    instructions: ['Ajuste o encosto e posicione o rolo acima dos tornozelos.', 'Estenda os joelhos até perto da extensão completa.', 'Flexione devagar para baixar o peso.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'agachamento-bulgaro', name: 'Agachamento búlgaro', primaryMuscleGroup: 'quadriceps', secondaryMuscleGroups: ['glutes'], category: 'compound', equipment: ['Banco', 'Peso corporal ou halteres'],
    instructions: ['Apoie o peito de um pé em um banco atrás do corpo.', 'Flexione o joelho da frente descendo com o tronco estável.', 'Empurre o chão com o pé da frente e complete as repetições dos dois lados.'], suggestedSets: 3, suggestedReps: '8-10 por lado',
  },
  {
    id: 'passada-com-halteres', name: 'Passada com halteres', primaryMuscleGroup: 'quadriceps', secondaryMuscleGroups: ['glutes', 'hamstrings'], category: 'compound', equipment: ['Halteres'],
    instructions: ['Fique em pé segurando os halteres ao lado do corpo.', 'Dê um passo à frente e flexione os joelhos com controle.', 'Empurre o chão para retornar e alterne as pernas.'], suggestedSets: 3, suggestedReps: '8-10 por lado',
  },
  {
    id: 'mesa-flexora', name: 'Mesa flexora', primaryMuscleGroup: 'hamstrings', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Mesa flexora'],
    instructions: ['Ajuste o rolo acima dos calcanhares e apoie o tronco.', 'Flexione os joelhos trazendo os calcanhares em direção aos glúteos.', 'Estenda as pernas devagar sem deixar o peso cair.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'cadeira-flexora', name: 'Cadeira flexora', primaryMuscleGroup: 'hamstrings', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Cadeira flexora'],
    instructions: ['Ajuste os rolos e sente-se com as costas apoiadas.', 'Flexione os joelhos puxando o rolo para baixo.', 'Retorne lentamente à posição inicial.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'stiff-com-barra', name: 'Stiff com barra', primaryMuscleGroup: 'hamstrings', secondaryMuscleGroups: ['glutes'], category: 'compound', equipment: ['Barra'],
    instructions: ['Fique em pé segurando a barra à frente das coxas.', 'Leve o quadril para trás e incline o tronco com as costas neutras.', 'Estenda o quadril para voltar à posição ereta.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'levantamento-terra-romeno-com-halteres', name: 'Levantamento terra romeno com halteres', primaryMuscleGroup: 'hamstrings', secondaryMuscleGroups: ['glutes'], category: 'compound', equipment: ['Halteres'],
    instructions: ['Segure os halteres à frente das coxas com os joelhos levemente flexionados.', 'Leve o quadril para trás enquanto os halteres descem junto às pernas.', 'Contraia os glúteos para voltar, mantendo as costas neutras.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'elevacao-pelvica', name: 'Elevação pélvica', primaryMuscleGroup: 'glutes', secondaryMuscleGroups: ['hamstrings'], category: 'compound', equipment: ['Banco', 'Barra ou peso corporal'],
    instructions: ['Apoie as costas no banco e posicione os pés no chão.', 'Eleve o quadril contraindo os glúteos até alinhar tronco e coxas.', 'Desça com controle sem relaxar completamente no chão.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'coice-de-gluteo-na-polia', name: 'Coice de glúteo na polia', primaryMuscleGroup: 'glutes', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de cabos', 'Tornozeleira'],
    instructions: ['Prenda a tornozeleira e segure o apoio da máquina.', 'Leve a perna para trás sem arquear a lombar.', 'Retorne lentamente e complete as repetições de cada lado.'], suggestedSets: 3, suggestedReps: '10-15 por lado',
  },
  {
    id: 'abducao-de-quadril-na-maquina', name: 'Abdução de quadril na máquina', primaryMuscleGroup: 'glutes', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina abdutora'],
    instructions: ['Sente-se com as costas apoiadas e ajuste a amplitude confortável.', 'Afaste os joelhos contra a resistência.', 'Retorne devagar sem deixar as placas baterem.'], suggestedSets: 3, suggestedReps: '12-15',
  },
  {
    id: 'agachamento-sumo', name: 'Agachamento sumô', primaryMuscleGroup: 'glutes', secondaryMuscleGroups: ['quadriceps', 'hamstrings'], category: 'compound', equipment: ['Halter ou kettlebell'],
    instructions: ['Afaste os pés além dos ombros e gire levemente as pontas para fora.', 'Flexione quadris e joelhos mantendo o tronco firme.', 'Empurre o chão e estenda as pernas para retornar.'], suggestedSets: 3, suggestedReps: '8-12',
  },
  {
    id: 'elevacao-de-panturrilha-em-pe', name: 'Elevação de panturrilha em pé', primaryMuscleGroup: 'calves', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de panturrilha ou degrau'],
    instructions: ['Fique em pé com a parte da frente dos pés apoiada.', 'Eleve os calcanhares o máximo confortável.', 'Desça lentamente até alongar as panturrilhas.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'elevacao-de-panturrilha-sentado', name: 'Elevação de panturrilha sentado', primaryMuscleGroup: 'calves', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de panturrilha sentada'],
    instructions: ['Sente-se com as pontas dos pés na plataforma e o apoio sobre as coxas.', 'Eleve os calcanhares contra a resistência.', 'Desça devagar até uma amplitude confortável.'], suggestedSets: 3, suggestedReps: '12-15',
  },
  {
    id: 'elevacao-de-panturrilha-no-leg-press', name: 'Elevação de panturrilha no leg press', primaryMuscleGroup: 'calves', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina leg press'],
    instructions: ['Posicione as pontas dos pés na borda inferior da plataforma.', 'Empurre a plataforma movendo apenas os tornozelos.', 'Flexione os tornozelos lentamente para alongar as panturrilhas.'], suggestedSets: 3, suggestedReps: '12-15',
  },
  {
    id: 'abdominal-tradicional', name: 'Abdominal tradicional', primaryMuscleGroup: 'abs', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Colchonete', 'Peso corporal'],
    instructions: ['Deite com os joelhos flexionados e os pés no chão.', 'Eleve os ombros contraindo o abdômen, sem puxar o pescoço.', 'Desça com controle até apoiar as costas.'], suggestedSets: 3, suggestedReps: '12-20',
  },
  {
    id: 'prancha', name: 'Prancha', primaryMuscleGroup: 'abs', secondaryMuscleGroups: ['shoulders'], category: 'isolation', equipment: ['Colchonete', 'Peso corporal'],
    instructions: ['Apoie antebraços e pontas dos pés no chão.', 'Mantenha o corpo alinhado e contraia o abdômen.', 'Sustente a posição respirando de forma regular.'], suggestedSets: 3, suggestedReps: '20-45 s',
  },
  {
    id: 'elevacao-de-pernas-deitado', name: 'Elevação de pernas deitado', primaryMuscleGroup: 'abs', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Colchonete', 'Peso corporal'],
    instructions: ['Deite de costas e mantenha a lombar confortável apoiada.', 'Eleve as pernas estendidas ou levemente flexionadas.', 'Abaixe devagar sem perder o controle do tronco.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'abdominal-na-polia', name: 'Abdominal na polia', primaryMuscleGroup: 'abs', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Máquina de cabos', 'Corda'],
    instructions: ['Ajoelhe-se diante da polia alta segurando a corda junto à cabeça.', 'Flexione o tronco aproximando as costelas do quadril.', 'Retorne devagar sem puxar com os braços.'], suggestedSets: 3, suggestedReps: '10-15',
  },
  {
    id: 'rosca-de-punho-inversa', name: 'Rosca de punho inversa', primaryMuscleGroup: 'forearms', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Barra', 'Banco'],
    instructions: ['Apoie os antebraços nas coxas com as palmas voltadas para baixo.', 'Estenda os punhos elevando o dorso das mãos.', 'Flexione devagar até a posição inicial.'], suggestedSets: 3, suggestedReps: '12-15',
  },
  {
    id: 'elevacao-de-panturrilha-unilateral', name: 'Elevação unilateral de panturrilha', primaryMuscleGroup: 'calves', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Degrau', 'Peso corporal'],
    instructions: ['Apoie a parte da frente de um pé em um degrau e segure um apoio.', 'Eleve o calcanhar de forma controlada.', 'Desça até alongar confortavelmente e troque de lado.'], suggestedSets: 3, suggestedReps: '10-15 por lado',
  },
  {
    id: 'abdominal-bicicleta', name: 'Abdominal bicicleta', primaryMuscleGroup: 'abs', secondaryMuscleGroups: [], category: 'isolation', equipment: ['Colchonete', 'Peso corporal'],
    instructions: ['Deite de costas e eleve as pernas com os joelhos flexionados.', 'Aproxime o cotovelo de um joelho enquanto estende a perna oposta.', 'Alterne os lados em movimento controlado.'], suggestedSets: 3, suggestedReps: '10-15 por lado',
  },
  {
    id: 'flexao-nordica-assistida', name: 'Flexão nórdica assistida', primaryMuscleGroup: 'hamstrings', secondaryMuscleGroups: ['glutes'], category: 'compound', equipment: ['Colchonete', 'Apoio para os tornozelos'],
    instructions: ['Ajoelhe-se com os tornozelos firmemente apoiados.', 'Incline o tronco para a frente lentamente, resistindo com a parte posterior das coxas.', 'Use as mãos para auxiliar o retorno à posição inicial.'], suggestedSets: 3, suggestedReps: '6-10',
  },]

