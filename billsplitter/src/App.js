const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=11886",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=9333",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=429610",
    balance: 0,
  },
];

export default function App() {
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        <FormAddFriend />
        <Button>Add Friend</Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function FriendsList() {
  const friends = initialFriends;

  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id} />
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owes you ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even! </p>}

      <Button>Select</Button>
    </li>
  );
}

function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🧑‍🤝‍🧑Friend Name</label>
      <input type="text" />

      <label>📸ImageURL</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function Button({ children }) {
  return <button className="button"> {children}</button>;
}
function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split a bill with placeholder</h2>
      <label>💵Bill Value</label>
      <input type="text" />
      <label>💵Your share </label>
      <input type="text" />
      <label>💵 placeholder expense</label>
      <input type="text" disabled />
      <label>💵 paid by:</label>
      <select>
        <option value="user">You</option>
        <option value="friend">placeholder</option>
      </select>
    </form>
  );
}
