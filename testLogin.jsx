<div>
                <label>
                  <input
                    type="radio"
                    value="staff"
                    checked={userType === "staff"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Staff
                </label>
                <label>
                  <input
                    type="radio"
                    value="parent"
                    checked={userType === "parent"}
                    onChange={(e) => setUserType(e.target.value)}
                  />
                  Parent
                </label>
              </div>
