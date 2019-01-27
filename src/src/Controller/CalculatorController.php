<?php

namespace App\Controller;

use App\Entity\Calculation;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

/**
 * Class CalculatorController.
 *
 * @author Majid Mvulle <majid@majidmvulle.com>
 */
class CalculatorController extends AbstractController
{
    /**
     * @Route("/", methods={"GET"})
     */
    public function index(): Response
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route("/report", methods={"GET"})
     */
    public function report(EntityManagerInterface $entityManager): Response
    {

        $results = $entityManager->getRepository(Calculation::class)->findBy([], ['createdAt' => 'DESC']);

        return $this->render('default/report.html.twig', ['results' => $results]);
    }
}
