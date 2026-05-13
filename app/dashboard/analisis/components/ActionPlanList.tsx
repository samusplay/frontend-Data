type Recommendation = {
    variable: string;
    impact: number;
    recommendation: string;
    type: string;
};

type Props = {
    recommendations: Recommendation[];
};

export default function ActionPlanList({
    recommendations
}: Props) {

    if (recommendations.length === 0) {
        return (
            <div className="p-4 border rounded-xl">
                <h3>No hay alertas</h3>

                <p>
                    La zona presenta un comportamiento estable.
                </p>
            </div>
        );
    }

    return (
        <div className="grid gap-4">

            {recommendations.map((item, index) => (

                <div
                    key={index}
                    className="border rounded-xl p-4 shadow"
                >

                    <div className="flex items-center gap-2 mb-2">

                        <span
                            className={
                                item.type === "opportunity"
                                    ? "text-green-600"
                                    : "text-red-500"
                            }
                        >
                            {item.type === "opportunity"
                                ? "✅"
                                : "⚠️"}
                        </span>

                        <span className="font-bold">
                            [{item.variable}]
                        </span>

                    </div>

                    <p>
                        {item.recommendation}
                    </p>

                </div>

            ))}

        </div>
    );
}