import { useState, useEffect, useContext } from 'react'
import { getUser } from '../services/helpers'
import { userContext } from '../state/userState'

const TableComponent = () => {
	const [data, setData] = useState([])
	const { user, setUser } = useContext(userContext)
	const [expandedTransactionId, setExpandedTransactionId] = useState(null)
	const id = window.localStorage.getItem('id')
	useEffect(() => {
		;(async () => {
			const user = await getUser(id)
			setUser(user)
			fetch(`/api/data?userId=${user.userId}`)
				.then(response => response.json())
				.then(data => setData(data))
				.catch(error => console.error('Error fetching data:', error))
		})()
	}, [])
	const formatAmount = amount => {
		return `$ ${amount.toFixed(2)}`
	}
	const formatDuration = seconds => {
		const minutes = Math.floor(seconds / 60)
		const remainingSeconds = seconds % 60
		return `${minutes}m ${remainingSeconds}s`
	}
	const handleTransactionIdClick = transactId => {
		setExpandedTransactionId(transactId)
	}
	return (
		<div style={{ textAlign: 'center' }}>
			<table style={{ margin: '0 auto' }}>
				<thead>
					<tr>
						<th style={thStyle}>ID</th>
						<th style={thStyle}>TimeStamp</th>
						<th style={thStyle}>Name</th>
						<th style={thStyle}>Call duration</th>
						<th style={thStyle}>Rate/min</th>
						<th style={thStyle}>Amount</th>
						<th style={{ ...thStyle, color: 'black' }}>Balance</th>
					</tr>
				</thead>
				<tbody>
					{/*Dynamic table rows*/}
					{data.map(item => (
						<tr key={item?._id.toString()}>
							<td
								style={tdStyle}
								onClick={() => handleTransactionIdClick(item?._id.toString())}
							>
								{item?._id.toString().substring(0, 6)
									? item?._id.toString().substring(0, 6)
									: item?.transactid?.substring(0, 6)}
							</td>
							<td style={tdStyle}>
								{new Date(item.timeStamp).toLocaleString('en-US', {
									timeStyle: 'short',
									dateStyle: 'short',
								})}
							</td>
							<td style={tdStyle}>
								<a
									href={`/profile/${item.helper}`}
									style={{ textDecoration: 'none', color: 'inherit' }}
								>
									{item.helper}
								</a>
							</td>
							<td style={tdStyle}>
								{formatDuration(item?.duration) ? item.duration : ''}
							</td>
							<td style={tdStyle}>{item.rate}</td>
							<td style={tdStyle}>{formatAmount(item.amount)}</td>
							<td style={{ ...tdStyle, color: item.isRecharge ? 'green' : 'black' }}>
								{item?.balance?.toFixed(2)}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
const tableStyle = {
	borderCollapse: 'collapse',
	width: '100%',
}

const thStyle = {
	border: '1px solid #dddddd', // Border for table header cells
	padding: '8px',
	textAlign: 'left',
}

const tdStyle = {
	border: '1px solid #dddddd', // Border for table data cells
	padding: '8px',
	textAlign: 'left',
}

export default TableComponent
