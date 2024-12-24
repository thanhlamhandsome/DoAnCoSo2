function TableHeader() {
    return(<thead className="bg-gray-100 border-b border-gray-200">
      <tr>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          Avatar
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          ID
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          Name
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          Email
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          Birthdate
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          User Type
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          Created At
        </th>
        <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600">
          Phone Number
        </th>
        <th className="px-6 py-3 text-right text-sm font-semibold text-gray-600">
          Actions
        </th>
      </tr>
    </thead>)
  }
  export default TableHeader;
  