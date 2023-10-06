//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

abstract contract Context {

    function _msgSender() internal view virtual returns (address) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes calldata) {
        return msg.data;
    }

    function _msgValue() internal view virtual returns (uint256 value) {
        return msg.value;
    }    


}

abstract contract Owner is Context {
    address public owner;

    constructor () {
        owner = _msgSender();
    }


    /**
    * Throws if called by any account other than the owner.
     */

    modifier onlyOwner() {
        require(_msgSender() == owner,"Only accessible to the owner");
        _;
    }

    /**
    * check if the current caller is the contract owner.
     */

    function isOwner() internal view returns(bool) {
        return owner == _msgSender();
    }
    
}



contract Voyte is Owner{
    
    address public myOwner;

    mapping(address => bool) admin;
    event Admin(address indexed user, bool status);

    constructor() {
        admin[_msgSender()] = true;
        emit Admin(_msgSender(),true);
    }

    modifier onlyAdmin(){
        require(admin[_msgSender()],"Only accessible to an Admin");
        _;
    }

    function addAdmin(address user,bool status) onlyOwner external {
        admin[user] = status;
        emit Admin(user,status);
    }
    


///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// Users Users Users ////////////////////////////////////////////////////


    struct User {
        bool exist;
        address user;
        string password;
        uint256 resetCode;
    }
    
    uint256 userCounter = 0;
    mapping(address => User ) users;
    mapping(uint256 => address ) addressIndex;
    
    
    
    // creats a user 
    event CreateUser (User user, uint time); 
    function creatUser(address userm, string memory passwordm,uint256 passkey) public returns (bool success ){
        User memory user = User(true,userm,passwordm,passkey);
        users[userm] = user;
        userCounter++;
        
        addressIndex[userCounter] =userm;
        
        emit CreateUser(user,block.timestamp);
        
        return true;
    }
    
    function login(address mUser, string memory passwordm ) public view returns (bool success) {
        
        string memory savedPass = users[mUser].password;
        
        if (bytes(savedPass).length != bytes(passwordm).length) {
            return false;
        }
        
        return keccak256(abi.encodePacked(savedPass)) == keccak256(abi.encodePacked(passwordm));
    }

    

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////// ADDRESS STATUS ADDRESS STATUS  ADDRESS STATUS/////////////////////////

    struct AddressStatus{
        bool isBanned;
        bool isRectricated;
        string reason;
    }

    mapping(address => AddressStatus) addressStatus;

    /**
    *   Adds an address to the list of blocked or restricted user depending on the violation
    *
     */
    event UpdateAddressStatus(address user, uint256 timestamp);

    function updateAddressStatus(address user, bool isBanned, bool isRectricated,string memory reason) onlyAdmin public {
        AddressStatus memory addStatus = AddressStatus(isBanned,isRectricated,reason);
        addressStatus[user] = addStatus;
        emit UpdateAddressStatus(user,block.timestamp);
    }

    /**
    *   Removes an address from the list of blocked or restricted user 
    *
     */

     event DeleteFromUpdateAddressStatus(address user, uint256 timestamp);

    function deleteFromUpdateAddressStatus (address user) onlyAdmin public{
        delete addressStatus[user];
        emit DeleteFromUpdateAddressStatus(user, block.timestamp);
    }
    

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////PROFILE PROFILE PROFILE//////////////////////////////////////////////

//Profile Voyte

    modifier hasNoProfile(address user){
        require(!profiles[user].exists,"This address already has an account");
        _;
    }
    
    modifier accountCreated(address user){
        require(users[user].exist,"Please create a user account; createUser()");
        _;
    }

    struct UserName {
        string firstName;
        string lastName;
    }
    
    struct Contact {
        bytes32 email;
        bytes32 website;
        uint256 phone;
        bytes32 physicalAddress;
        
    }

    struct Profile {
        bool exists;
        address mAddress;
        UserName userName;
        Contact Contact;
        string bio;
        bytes32 country;
        bytes32 profileImg;
        bytes32 coverImg;
        bytes32 ProfileType;
        bool isVerified;

    }

    uint256 public profileCounter = 0;
    mapping (address => Profile ) profiles;
    mapping (uint256 => address) profileAddress;

    /**
    *   Add a new profile
    *
     */
    event CreateProfile(address indexed user,uint256 timestamp);

    function createProfile(address _user, UserName memory _username, Contact memory _contact,string memory _bio,bytes32 _country, 
                             bytes32 _profileImg, bytes32  _coverImg, bytes32  _profileType) hasNoProfile(_user) accountCreated(_user)  public returns (bool success){

        
        profileCounter ++;
        
        Profile memory profile = Profile(true,_user,_username,_contact,_bio,_country,_profileImg,_coverImg,_profileType,false);
        profiles[_user] = profile;
        profileAddress[profileCounter] = _user;

        emit CreateProfile(_user,block.timestamp);

        return true;

    }

    function getProfile(address _user) public view returns (Profile memory userAddress) {
        return profiles[_user];
    }

    function getProfileAddress(uint256 _index) public view returns (address userAddress) {
        return profileAddress[_index];
    }

    /**
    *   deletes profile
    */

    event DeleteProfile(address user, uint256 timestamp);

    function deleteProfile(address user) public onlyAdmin (){
        delete profiles[user];

        emit DeleteProfile(user,block.timestamp);
    }
    

///////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////POST POST POST POST//////////////////////////////////////////////////

    modifier hasProfile(address user){
        require(profiles[user].exists,"You must create a profile to make a post");
        _;
    }

    struct Post {
        
        uint256 postId;
        address mAddress;
        address affliation;
        uint256 minAmounts;
        bytes32 caption;
        bytes32 message;
        bytes32 mediaUrls;
        uint256 dateCreated;
        uint256 dateModified;
        
    }

    uint256 public postId;

    mapping (uint256 => address ) postAddressIndex;
    mapping (address => Post ) posts;

    

    /**
    * Creates a post with affilliation
    */

    event NewPost(uint256 postId);

    function addPost(uint256 _postId, address _user, address _affiliation, uint256 _minAmount, bytes32 _caption, bytes32 _message, bytes32 _mediaUrl) hasProfile(_user) public returns (bool success){
        Post memory post = Post(_postId,_user,_affiliation,_minAmount,_caption,_message,_mediaUrl,block.timestamp,block.timestamp);

        posts[_user] = (post);
        postAddressIndex[postId] = _user;

        emit NewPost(postId++);

        return true;
    }


    function getUserPost(address user) public view returns (Post memory) {
        return posts[user];
    }

    /**
    *   Deletes a posts, only onwer 
    */
    event DeletePost(uint256 postId);

     function deletePost( address _user,uint256 _postId) hasProfile(_user) public returns (bool success) {
         
        if(posts[_user].postId == _postId){
            delete posts[_user];
            emit DeletePost(_postId);
            return true;
        }

        return false;
     }
     
     
    /////make changes to values methods
    
    /*
    
        //Affliation
    
    function setAffliation (address _user, address _affiliation, uint256 _postId, uint256 _postIndex) public returns ( bool success ) {
        
        
        if(groupedPosts[_user][_postIndex].postId == _postId){
            groupedPosts[_user][_postIndex].affliation = _affiliation;
            
            return true;
        }
        
        return false;
        
    }
        // minAmounts;
   
    function setMinAmount (address _user, uint256 _minAmount, uint256 _postId, uint256 _postIndex) public returns ( bool success ) {
        
     
        if(groupedPosts[_user][_postIndex].postId == _postId){
            groupedPosts[_user][_postIndex].minAmounts = _minAmount;
            
            return true;
        }
        
        return false;
        
    }
    
        // caption;
        
   
    function setCaption (address _user, string memory _caption, uint256 _postId, uint256 _postIndex) public returns ( bool success ) {
        
    
        
        if(groupedPosts[_user][_postIndex].postId == _postId){
            groupedPosts[_user][_postIndex].caption = _caption;
            
            return true;
        }
        
        return false;
        
    }
        // message;
        
    
    function setMessage (address _user, string memory _message, uint256 _postId, uint256 _postIndex) public returns ( bool success ) {

        
        if(groupedPosts[_user][_postIndex].postId == _postId){
            groupedPosts[_user][_postIndex].message = _message;
            
            return true;
        }
        
        return false;
        
    }
        // mediaUrls;
        

    function setMedialUrl (address _user, string memory _mediaUrl, uint256 _postId, uint256 _postIndex) public returns ( bool success ) {
        
        
        if(groupedPosts[_user][_postIndex].postId == _postId){
            groupedPosts[_user][_postIndex].mediaUrls = _mediaUrl;
            
            return true;
        }
        return false;
    }

*/
///////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////// AMOUNT DONATED AMOUNT DONATED AMOUNT DONATED AMOUNT DONATED//////////////////////

    /**
    *   To keep tracts the amount payed per year and month
    */

    struct AmountDonated {
        uint256 postId;
        address donor;
        address receiver;
        uint256 amount;
        uint256 time;
    }

    mapping ( uint256 => AmountDonated[] ) public amountDonated;

    event NewAmountDonated (uint256 _PostId );

    function mDonate(uint256 aPostId,address aDonor, address aReceiver, uint256 aAmount, uint256 aTime) hasProfile(aReceiver) public returns (bool success){
        AmountDonated memory amountDonate = AmountDonated(aPostId,aDonor,aReceiver,aAmount,aTime);

        amountDonated[aPostId].push(amountDonate);

        emit NewAmountDonated(aPostId);

        return true;
    } 


    /**
    *   send Trx to the post ower
    *
    */

     function _sendTrx(address receiver, uint256 amount) internal {
        payable(address(receiver)).transfer(amount);
     }


}

