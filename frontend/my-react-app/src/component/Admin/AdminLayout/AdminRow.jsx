
function AdminRow({ user, index,showForm }) {
  async function deleteAdmin(id) {
    const response = await fetch("http://localhost:3000/user",{
      method: "delete", 
      headers: {
        'Content-Type': 'application/json'
      },
      body:JSON.stringify({_id:id})
    })
    const resData = await response.json();
    window.location.reload();
  return resData
  }
    return (
      <>
        <tr
          key={user.id}
          className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}
        >
          <td className="px-6 py-4 text-sm text-gray-700">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-10 h-10 rounded-full"
            />
          </td>
          <td className="px-3 py-4 text-sm text-gray-700 ">{user._id}</td>
          <td className="px-3 py-4 text-sm text-gray-700">{user.name}</td>
          <td className="px-3 py-4 text-sm text-gray-700">{user.email}</td>
          <td className="px-3 py-4 text-sm text-gray-700">{user.birthdate}</td>
          <td className="px-3 py-4 text-sm text-gray-700">{user.userType}</td>
          <td className="px-3 py-4 text-sm text-gray-700">{user.createdAt}</td>
          <td className="px-3 py-4 text-sm text-gray-700">{user.phoneNumber}</td>
          <td className="px-3 py-4 text-right">
            <button className="text-green-600 hover:text-green-800 mx-2" onClick={()=>showForm(user)}>
              Edit
            </button>
            <button onClick={()=>deleteAdmin(user._id)} className="text-red-600 hover:text-red-800 mx-2">
              Delete
            </button>
          </td>
        </tr>
      </>
    );
  }
 
  export default AdminRow;
