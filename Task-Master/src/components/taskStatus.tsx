import { differenceInDays, differenceInMonths, differenceInYears, formatDistance } from 'date-fns'
import { ptBR } from 'date-fns/locale';

interface StatusProps {
    done?: boolean;
    priority?: string;
    dueDate: string;
  }

export const Status = (props: StatusProps) => {

    const hoje = new Date();
    const vencimento = new Date(props.dueDate);

    function parseDataBrasileiraParaISO(dataBR: string): string {
        const [dia, mes, ano] = dataBR.split("/");
        return `${ano}-${mes}-${dia}`;
      }
    
    const diasRestantes = differenceInDays(parseDataBrasileiraParaISO(props.dueDate), hoje);
    const mesesRestantes = differenceInMonths(parseDataBrasileiraParaISO(props.dueDate), hoje);
    const anosRestantes = differenceInYears(parseDataBrasileiraParaISO(props.dueDate), hoje);
    const dataFormatada = formatDistance(parseDataBrasileiraParaISO(props.dueDate), hoje, { locale: ptBR });
    
    if (props.done === true) {
        return (
            <img title="Status" className="rounded-2xl" src="/white.png" alt="Ícone" width={34} height={34} />

        )
    } else {
        return (
            <img title="Status" className="rounded-2xl" src="/red.png" alt="Ícone" width={34} height={34} />
        )
    }
}


export const StatusOfPriority = (props: StatusProps) => {
    if (props.priority === "low") {
        return (
            <img title="Prioridade: baixa" className="rounded-2xl" src="/low.png" alt="Ícone" width={32} height={32} />
        )
    } else if (props.priority === "medium") {
        return (
            <img title="Prioridade: média" className="rounded-2xl" src="/medium.png" alt="Ícone" width={32} height={32}/>
        )
    } else {
        return (
            <img title="Prioridade: alta" className="rounded-2xl" src="/high.png" alt="Ícone" width={32} height={32} />
        )
    }
}

