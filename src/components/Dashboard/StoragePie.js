import React from 'react'
import {Card} from 'react-bootstrap'

export default function StoragePie({storage}) {
    return (
        <Card className="userInfoCards">
            <Card.Body>
                <div id="pieChart"></div>
            </Card.Body>
            <Card.Body>
                <div id="storageDetails">
                    <p>
                        <span id="freeLegend"></span>Free {storage.toFixed(2)}%
                    </p>
                    <p>
                        <span id="usedLegend"></span>Used {100-storage.toFixed(2)}%
                    </p>
                </div>
            </Card.Body>
        </Card>
    )
}
