sudo snap remove microk8s
sudo snap install microk8s --classic
cd $HOME
mkdir .kube
cd .kube
microk8s config > config
cd $HOME
microk8s start
