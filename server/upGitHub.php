<?php
class upGithub{
  
  public $error;
  public $email = 'anonimous@bonjour.com';
  
  private $token;
  
  public function __construct($owner, $token, $repos = null, $email = null){
    $this->token = 'Authorization: token ' . $token;
    $this->owner = $owner;
    if($repos) $this->repos = $repos;
    if($email) $this->email = $email;
  }
  
  public function setRepos($r){
    $this->repos = $r;
  }
  
  public function setEmail($e){
    $this->email = $e;
  }
  
  
  public function getSHA($file){
    $curl_url = 'https://api.github.com/repos/' . $this->owner . '/' . $this->repos . '/contents/' . $file;
    
    $ch = curl_init($curl_url);
    
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'User-Agent: $username', $this->token, 'Accept: application/vnd.github.v3+json' ));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "GET");
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
    
    $response = curl_exec($ch);  
    $this->error = curl_error($ch);
    curl_close($ch);
    $response = json_decode($response,1);

    return ($response['sha'])?$response['sha']:null;
  }
  
  public function uploadFile($name, $content){
    $sha = $this->getSHA($name);
    
    $data = array('message' => "commit message",
              'committer' => array(
                "name"=> $name,
                "email"=>$this->email),
              "content" => base64_encode($content),
              );
              
    if($sha){
      $data['sha']=$sha;
    }

    $url = 'https://api.github.com/repos/' . $this->owner . '/'.$this->repos.'/contents/'.$name;

    $ch = curl_init($url);

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array( 'User-Agent: $username', $this->token ));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "PUT");
    curl_setopt($ch, CURLOPT_POSTFIELDS,json_encode($data));
    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

    $response = curl_exec($ch);  
    $this->error = curl_error($ch);
    curl_close($ch);
    $response = json_decode($response);

    return $response;
  }
}

$x = new upGithub('','token');
$x->setRepos('uploader-to-github-on-php');
var_dump( $x->getSHA('test1')); // return sha
var_dump( $x->uploadFile('test1','testtext1')); //upload new file 'test' with contents 'testtext'
?>