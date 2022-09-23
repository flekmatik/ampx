import dayjs from 'dayjs';
import { Bar, ComposedChart, Line, Tooltip, XAxis, YAxis } from 'recharts';
import { Transaction } from '../../views/TransactionsView/TransactionsView';

interface CashflowChartProps {
    transactions: Transaction[];
}

type CashflowChartData = {
    [date: string]: { income?: number, expenses?: number };
}

const formatter = (dayNum: number) => dayjs(dayNum * 86400000).format('DD/MM');

export const CashflowChart = (props: CashflowChartProps) => {
    if (!props.transactions.length) {
        return null;
    }
    const transactionsWithDays = props.transactions.map(transaction => ({
        ...transaction,
        day: dayjs(transaction.date, 'YYYY-MM-DD').utc(true).valueOf() / 86400000,
    }));
    const days = transactionsWithDays.map(({ day }) => day);
    const minDay = Math.min(...days);
    const maxDay = Math.max(...days);
    const emptyChartData = [...Array(maxDay - minDay + 1)]
        .map((_, index) => minDay + index)
        .reduce<CashflowChartData>((acc, day) => ({ ...acc, [day]: {} }), {});

    const cashflowChartData = transactionsWithDays
        .reduce((acc, transaction) => {
            const { day, amount } = transaction;
            const type = amount < 0 ? 'expenses' : 'income';
            const entry = acc[day];
            console.log('L', entry, day, emptyChartData, acc)
            return {
                ...acc,
                [day]: {
                    ...entry,
                    [type]: (entry[type] ?? 0) + amount,
                },
            };
        }, emptyChartData);
    let runningTotal = 0;
    const data = Object.entries(cashflowChartData)
        .map(([day, data]) => ({ day: parseInt(day, 10), ...data }))
        .sort((a, b) => a.day - b.day)
        .map((item, index, acc) => {
            const dayTotal = (acc[index].income ?? 0) + (acc[index].expenses ?? 0);
            runningTotal += dayTotal;
            return ({
                ...item,
                total: runningTotal,
            });
        });

    return (
        <ComposedChart width={400} height={200} data={data} stackOffset="sign">
            <Bar dataKey="expenses" stackId="a" fill="#ff0000" />
            <Bar dataKey="income" stackId="a" fill="#00ff00" />
            <Line type="monotone" dataKey="total" stroke="#0000ff" dot={false} />
            <Tooltip labelFormatter={formatter} />
            <XAxis
                dataKey="day"
                tickFormatter={formatter}
            />
            <YAxis unit="€" />
        </ComposedChart>
    );
};
