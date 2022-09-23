import {Cell, Legend, Pie, PieChart} from "recharts";
import {Transaction} from "../../views/TransactionsView/TransactionsView";
import {Category} from "../../pages/MainPage/MainPage";

interface CategoryChartProps {
    transactions: Transaction[];
    categories: Category[];
}

export const CategoryChart = (props: CategoryChartProps) => {
    const data = props.categories
        .map(category => ({
            id: category.id,
            title: category.title,
            color: category.color,
            total: props.transactions
                .filter(t => t.categoryId === category.id)
                .map(t => t.amount)
                .reduce((acc, amount) => acc + amount, 0),
        }))
        .filter(item => item.total);
    return (
        <PieChart width={250} height={250}>
            <Legend
                formatter={value => <span style={{ color: 'black' }}>{value}</span>}
            />
            <Pie
                data={data}
                dataKey="total"
                nameKey="title"
                cx="50%"
                cy="50%"
                fill="#8884d8"
            >
                {data.map((entry, index) => (
                    <Cell
                        key={entry.id}
                        fill={entry.color}
                    />
                ))}
            </Pie>
        </PieChart>
    );
}