import { formatDistance, differenceInDays, differenceInHours } from 'date-fns'
import { ptBR } from 'date-fns/locale';

interface VencimentoProps {
    dueDate: string;
    done: boolean;
}

export const Vencimento = (props: VencimentoProps) => {

    const hoje = new Date();

    function parseDataBrasileiraParaISO(dataBR: string): string {
        const [dia, mes, ano] = dataBR.split("/");
        return `${ano}-${mes}-${dia}`;
      }

    const diasRestantes = differenceInDays(parseDataBrasileiraParaISO(props.dueDate), hoje);
    const dataFormatada = formatDistance(parseDataBrasileiraParaISO(props.dueDate), hoje, { locale: ptBR });
    const horasRestantes = differenceInHours(parseDataBrasileiraParaISO(props.dueDate), hoje);

    if (props.done === true) {
        return (
            <p className="text-green-600 font-bold p-0.5">Tarefa concluída</p>
        )
    } else {

        if (diasRestantes < 0) {

            if (diasRestantes > -30) {
                return (
                    <p className="text-red-500 font-bold p-0.5">🚨Vencida há {Math.abs(diasRestantes)} dia(s)</p>
                )
            } else {
                return (
                    <p className="text-red-500 font-bold p-0.5">🚨Vencida há {dataFormatada}</p>
                )
            }

        } else if (diasRestantes == 0) {

            if (horasRestantes > 0) {

                return (
                    <p className="text-red-500 font-bold p-0.5">🚨Vence Amanhã!!</p>
                )
            } else{

                return (
                    <p className="text-red-500 font-bold p-0.5">🚨Vence hoje!!</p>
                )
            }

        } else if (diasRestantes < 7) {

            return (
                <p className="text-red-500 font-bold p-0.5">🚨Vence em {dataFormatada}!!</p>
            )

        } else if (diasRestantes < 15) {

            return (
                <p className="text-amber-300 font-bold p-0.5">⚠️Vence em {dataFormatada}!</p>
            )

        } else {

            return (
                <p className="text-blue-700 font-bold p-0.5">Vence em {dataFormatada}.</p>    
            )
        }
    }
}