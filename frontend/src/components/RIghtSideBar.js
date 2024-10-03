import React, { useState } from "react";
import Avatar from "react-avatar";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
const RIghtSideBar = ({ otherusers }) => {
  const [searchUser, setSearchUser] = useState("");
  const navigate = useNavigate();
  const FilteredUsers = otherusers?.filter((user) => {
    return (
      user?.name?.toLowerCase().includes(searchUser.toLowerCase()) ||
      user?.username?.toLowerCase().includes(searchUser.toLowerCase())
    );
  });

  return (
    <div className="lg:w-[25%] md:w-[30%]">
      <div className="flex items-center p-2 bg-gray-100 rounded-full outline-none">
        <CiSearch size="20px" />
        <input
          type="text"
          className="px-2 outline-none bg-transparent"
          placeholder="Search"
          onChange={(e) => {
            setSearchUser(e.target.value);
          }}
        />
      </div>
      <div className="p-4 bg-gray-100 rounded-2xl my-5">
        <h1 className="lg:text-3xl md:text-2xl font-bold lg:mb-10 md:mb-6">
          Who to follow
        </h1>

        {FilteredUsers &&
          FilteredUsers?.map((otheruser) => {
            return (
              <>
                <div
                  key={otheruser?._id}
                  className="flex justify-between items-center mt-6"
                >
                  <div className="flex">
                    <div
                      onClick={() => {
                        navigate(`/profile/${otheruser?._id}`);
                      }}
                    >
                      <Avatar
                        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKAAAACUCAMAAAAj+tKkAAAANlBMVEX///+ZmZmVlZXa2tqSkpKPj4/m5ub8/PzNzc3w8PD4+PigoKDg4ODS0tK4uLioqKivr6/CwsIOjwJ1AAAFXElEQVR4nO1c23q0KgwdDoqAgr7/y/46nbbqAEkAne5vsy56N+kCciIJPh4NDQ0NDQ0NDQ0N/wcoY/QPjFGf5nOAHqfFzZ5x+QXmZ7dMQn+a1xNqXLxljHO2B99g/TJ+didVP81dJ1kUvOvmqf8USTXNVvI4uxdHaedpo3gzTaUXlti6IyRb9M0MewK9F8X+RnpmYeDRvh01c3dZtRlgzQtSlIO5g9/os+htkH68nJ52edv32sTu6nPuPck2AhTtlcaiBrpxvGO6jJ9xXTk9xjpnrvGJZq6wfRv4fIk16xrH+2LIdP097G01fpeYiq7Jb9vDvu4eVjzfb1R1iMbWpse4r2gppv7+badc7YyVw4WPNX+WnMtUir2HdLUYDpj/uF5BnNjuc7oXDqcRcqnDTyDix5rtif1vRofRiq5KcoMxEOnPNyOFSitsBVNWiADH3+L/RndC/LCCGk6IjRBhpyvgX74vjQqF4NfHbmw9gmGpN4Q9DE9o+ghfm10ZP3gP+JC68Q6wHhalDQgLmZNqrmZwgWkBAHrQBXbABsASZMkWgjdMPkMi4DPw+fxgHZdALFCPEbYykZaRkO7g1YOhQIOBKN9ba0g0yknAq+S5WrjATnqApcCeJjOrUQ9EPoJQnxGWwrMIPkZEmoU4HES8g0wtAlh5UDcfWJMZy4p3sPnVI5iVF8JOkNU64mTCEQXChlFGgsgKs+xYoQqpVdzMdkmm+2qDusrBQQARjlZIet4KpyEbYO1G2VrO/Q51GWYSVEKBk4PQlROQ1UoLyUFWxcC07Q0eJRc8G0w42kBOCtH1rHSRyiDXySzVSjDu9Ym0C0M50yeosQSRg3wzTNgJzkKeoOaEGP//QjxlF4SyIjXvRxRWfhGpXwwEEeT2DiZA/YAvARU3eP1jX/f/6wgybs/TE0pYUlfvYoKMs6/BhB96WPdyF8EVUvpB9CvGwUtyU+8GgltLfeslr3/pP72HYAmuNhLZnSFpnXkyQYIfXBVuXsTYHzCKxbGOQJLqB7GRZOuOROO8EQ7tbKiRBJcsSDsAQV5PHmfR1JQak6lzKzB3HYHKWanZjIKrZsEAF4JZYIaWPBIJhYI1uuGFjeBy6WVW4La4DUYQ1gwNZGR0I9K3OumIKbpJN1wkveOkU8aXU6pIZl8dvXqkUgdCvySumFMMM8rUca3hcOk8BB2v9mStONHmzOzyxiuFGSqYuNd19DLFC0NUr3PqgybSZitorkVbf3kjKjH/XzBoEDkVnteHiDiaLAv+RngLM5zME8H4BLU30whXHcESWQRBO84V9kIos8m2ulDKleUQdggtOns4RYXMpHDwL5AIZ5pIRFrpdGfIeRWMEr7lXAWrfeHtVArmPlTA02RHkW+83Wdl0XjUeb1FExBP9CcrKTyTsyHz4mkwfVpy6XzZKb7z4mEwdSSY0SA54ehZM3vjexzlFfr9FaexknKCxxOpMOJ4NLu6BMkloxCOfdlyeXt+GV3YAA6Zerm4vbRKw977NFMUYyes2gOina/hxfgR1VWaUt6A6poTIQtnLw+o9tZlz6/iawiFHLGg8CsavAzAJAsXZFzwaqgqQ3nJq6Z6llI6mxyBIrUvE5DLVS95J15lE697+Vf+cvL5cOI6fmAlF8GPWjsmA9f1iIBbcf1Tcp1vK3K555F273NeiXHE0HU1CLqxSJ89cJ4DIxCfWNjtnrTxnuhVGB32Swacuevftgeg+snDj/xk56c7P7Fwgh68PX+I5Hfntu+RQA3lGziKwVm2zSjwX2bPb7q44Y980eWhjO6nxflXIcf6eZl6/cc+ivP30faroaGhoaGhoeG/iH8yXzh9wKHc4QAAAABJRU5ErkJggg=="
                        size="40"
                        round={true}
                      />
                    </div>

                    <div className="ml-2">
                      <div>
                        <h1 className="font-bold">{otheruser?.name}</h1>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">
                          {`@${otheruser?.username}`}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                    <button
                      className="border-none outline-none text-white lg:text-md md:text-sm lg:font-semibold  bg-black rounded-full lg:px-3 md:px-2 py-1"
                      onClick={() => {
                        navigate(`/profile/${otheruser?._id}`);
                      }}
                    >
                      Profile
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};

export default RIghtSideBar;
